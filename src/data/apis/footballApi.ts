import Fixture from '@/models/Fixture';
import Odds from '@/models/Odds';
import { FixtureLiveFilters } from '@/models/filters';
import ApiResponse from '@/models/response/ApiResponse';
import FixtureResponse from '@/models/response/FixtureResponse';
import OddsLiveResponse from '@/models/response/OddsLiveResponse';
import OddsPreMatchResponse from '@/models/response/OddsPreMatchResponse';
import { round } from '@/utils/helpers/round';

import axios from 'axios';
import { format } from 'date-fns';

class FootballApi {
  private readonly api = axios.create({ baseURL: 'https://api-football-v1.p.rapidapi.com/v3' })
  private readonly apiKey = process.env.FOOTBALL_API_KEY
  private readonly timezone = 'America/Sao_Paulo'

  //#region FillFixtures

  async saveFixtures(date: string): Promise<Fixture[]> {
    try {
      const config = {
        params: {
          timezone: this.timezone,
          date,
          status: 'FT'
        },
        headers: {
          "X-RapidAPI-Key": this.apiKey
        }
      }

      const response = await this.api.get<ApiResponse<FixtureResponse>>(
        '/fixtures',
        config
      )

      if(response && response.data) 
        return this.getTreatedFixtures(response.data, false, 0, 0, 0, date);
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  //#endregion

  //#region LiveFixtures

  async getLiveFixtures(filters: FixtureLiveFilters): Promise<Fixture[]> {
    try {
      const filterLeague = filters.leagueId ? filters.leagueId : null

      const config = {
        params: {
          timezone: this.timezone,
          live: 'all',
          league: filterLeague ? filterLeague : undefined,
        },
        headers: {
          "X-RapidAPI-Key": this.apiKey
        }
      }

      const response = await this.api.get<ApiResponse<FixtureResponse>>(
        '/fixtures',
        config
      )

      if(response && response.data) 
        return this.getTreatedFixtures(response.data, true, filters.leagueId, filters.homeTeamId, filters.awayTeamId, format(new Date(), 'yyyy-MM-dd'));
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  private async getTreatedFixtures(
    data: ApiResponse<FixtureResponse>, 
    isLiveMatch: boolean,
    leagueId: number, 
    homeTeamId: number, 
    awayTeamId: number,
    date: string): Promise<Fixture[]> {
    let apiFixtures = data.response

    if(homeTeamId && homeTeamId !== 0)
      apiFixtures = apiFixtures.filter(f => f.teams.home.id === homeTeamId)

    if(awayTeamId && awayTeamId !== 0)
      apiFixtures = apiFixtures.filter(f => f.teams.away.id === awayTeamId)

    let odds;
    if(!apiFixtures || apiFixtures.length === 0) return []

    if(isLiveMatch) 
      odds = await this.getLiveOdds(leagueId);
    else 
      odds = await this.getPreMatchOdds(date, 1)

    const fixtures = [] as Fixture[]
    for (const apiFixture of apiFixtures) {
      let oddMatch;

      if(odds && odds.length > 0) {
        oddMatch = odds.find(o => o.fixtureId === apiFixture.fixture.id)
      }
      
      const fixture = new Fixture(apiFixture, oddMatch)
      fixtures.push(fixture)
    }

    return fixtures
  }

  //#endregion

  //#region LiveOdds

  private async getLiveOdds(leagueId: number): Promise<Odds[]> {
    try {
      const filterLeague = leagueId ? leagueId : null

      const config = {
        params: {
          bet: 59,
          league: filterLeague ? filterLeague : undefined,
        },
        headers: {
          "X-RapidAPI-Key": this.apiKey
        }
      }

      const response = await this.api.get<ApiResponse<OddsLiveResponse>>(
        '/odds/live',
        config
      )
        
      if(response && response.data) 
        return this.getTreatedLiveOdds(response.data);
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  private getTreatedLiveOdds(data: ApiResponse<OddsLiveResponse>): Odds[] {
    const apiOdds = data.response

    if(!apiOdds || apiOdds.length === 0) 
      return null

    const oddsTreated = [] as Odds[]
    for (const apiOdd of apiOdds) {
      const { fixture, odds } = apiOdd
      
      if (!fixture) 
        continue
    
      if (!odds || odds.length === 0)
        continue
        
      const oddsValue = odds[0].values
      
      if(!oddsValue || oddsValue.length === 0)
        continue

      const homeOdds = oddsValue.find(ov => ov.value === 'Home')
      const drawOdds = oddsValue.find(ov => ov.value === 'Draw')
      const awayOdds = oddsValue.find(ov => ov.value === 'Away')

      const oddsLive = new Odds()
      oddsLive.fixtureId = fixture.id
      oddsLive.homeOdds = homeOdds ? round(Number(homeOdds.odd)) : 0
      oddsLive.drawOdds = drawOdds ? round(Number(drawOdds.odd)) : 0
      oddsLive.awayOdds = awayOdds ? round(Number(awayOdds. odd)) : 0

      oddsTreated.push(oddsLive)
    }

    return oddsTreated;
  }

  //#endregion

  //#region PreMatchOdds

  private async getPreMatchOdds(date: string, page: number, odds?: Odds[]): Promise<Odds[]> {
    try {
      if (!odds) {
        odds = [] as Odds[]
      }

      const config = {
        params: {
          bet: 1,
          timezone: this.timezone,
          date,
          page
        },
        headers: {
          "X-RapidAPI-Key": this.apiKey
        }
      }

      const response = await this.api.get<ApiResponse<OddsPreMatchResponse>>(
        '/odds',
        config
      )
        
      if(response && response.data) {
        odds.push(... await this.getTreatedPreMatchOdds(response.data));
        
        if(response.data.paging.current < response.data.paging.total) {
          await this.getPreMatchOdds(date, page + 1, odds)
        }

        return odds;
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  private getTreatedPreMatchOdds(data: ApiResponse<OddsPreMatchResponse>): Odds[] {
    const apiOdds = data.response

    if(!apiOdds || apiOdds.length === 0) 
      return null

    const oddsTreated = [] as Odds[]
    for (const apiOdd of apiOdds) {
      const { fixture, bookmakers } = apiOdd
      
      if (!fixture) 
        return null;
    
      if (!bookmakers || bookmakers.length === 0)
        return null;

      let bookmaker = bookmakers.find(b => b.id === 8)

      if(!bookmaker) {
        bookmaker = bookmakers.find(b => b.id === 3)
      }

      if (!bookmaker) bookmaker = bookmakers[0]
        
      const oddsBets = bookmaker.bets
      
      if(!oddsBets || oddsBets.length === 0)
        return null;

      const odds = oddsBets[0].values
      
      if(!odds || odds.length === 0)
        return null;

      const homeOdds = odds.find(ov => ov.value === 'Home')
      const drawOdds = odds.find(ov => ov.value === 'Draw')
      const awayOdds = odds.find(ov => ov.value === 'Away')

      const oddsLive = new Odds()
      oddsLive.fixtureId = fixture.id
      oddsLive.homeOdds = homeOdds ? round(Number(homeOdds.odd)) : 0
      oddsLive.drawOdds = drawOdds ? round(Number(drawOdds.odd)) : 0
      oddsLive.awayOdds = awayOdds ? round(Number(awayOdds. odd)) : 0

      oddsTreated.push(oddsLive)
    }

    return oddsTreated
  }

  //#endregion
}

export default new FootballApi()