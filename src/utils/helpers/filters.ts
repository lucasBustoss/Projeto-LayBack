import { parseISO } from 'date-fns'

export const getFilters = (leagueId: number, homeTeamId: number, awayTeamId: number, initialDate: string, finalDate: string): FixtureFilters => {
  const filters = {} as FixtureFilters

    filters.leagueId = Number(leagueId) ?? null
    filters.homeTeamId = Number(homeTeamId) ?? null
    filters.awayTeamId = Number(awayTeamId) ?? null
    filters.initialDate = initialDate ? parseISO(initialDate.toString()) : null
    filters.finalDate = finalDate ? parseISO(finalDate.toString()) : null

    return filters
}