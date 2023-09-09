import Team from "./Team";
import League from './League'
import FixtureResponse from "./response/FixtureResponse";
import Odds from "./Odds";
import { format, parseISO } from "date-fns";

export default class Fixture {
  id: number
  private league: League
  private date: Date
  private homeTeamGoals: number
  private awayTeamGoals: number
  private homeTeam: Team
  private awayTeam: Team
  private homeOdds: number
  private awayOdds: number
  private drawOdds: number

  constructor(apiFixture: FixtureResponse, odds: Odds) {
    this.id = apiFixture.fixture.id
    this.date = parseISO(apiFixture.fixture.date)

    this.league = new League()
    this.league.id = apiFixture.league.id   
    this.league.name = apiFixture.league.name   

    this.homeTeam = new Team()
    this.homeTeam.id = apiFixture.teams.home.id
    this.homeTeam.name = apiFixture.teams.home.name

    this.awayTeam = new Team()
    this.awayTeam.id = apiFixture.teams.away.id
    this.awayTeam.name = apiFixture.teams.away.name

    this.homeTeamGoals = apiFixture.goals.home ?? -1
    this.awayTeamGoals = apiFixture.goals.away ?? -1

    this.homeOdds = odds ? odds.homeOdds : 0
    this.drawOdds = odds ? odds.drawOdds: 0
    this.awayOdds = odds ? odds.awayOdds: 0
  }
}