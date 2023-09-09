import { FixtureLiveFilters } from '@/models/filters/livefilters'
import { DateFilter, FixturePastFilters } from '@/models/filters/pastFilters'
import { endOfDay, parseISO, startOfDay } from 'date-fns'

export const getPastFilters = (leagueId: number, homeTeamId: number, awayTeamId: number, initialDate: string, finalDate: string): FixturePastFilters => {
  const filters = new FixturePastFilters()
    
    if (leagueId) {
      filters['league.id'] = leagueId
    }

    if (homeTeamId) {
      filters['homeTeam.id'] = homeTeamId
    }

    if (awayTeamId) {
      filters['awayTeam.id'] = awayTeamId
    }
    
    if(initialDate && finalDate) {
      filters.date = new DateFilter();
      filters.date = { $gte: startOfDay(parseISO(initialDate)), $lte: endOfDay(parseISO(finalDate)) }
    }

    return filters
}

export const getLiveFilters = (leagueId: number, homeTeamId: number, awayTeamId: number): FixtureLiveFilters => {
  const filters = new FixtureLiveFilters()
    
    if (leagueId) {
      filters.leagueId= leagueId
    }

    if (homeTeamId) {
      filters.homeTeamId = homeTeamId
    }

    if (awayTeamId) {
      filters.awayTeamId = awayTeamId
    }

    return filters
}