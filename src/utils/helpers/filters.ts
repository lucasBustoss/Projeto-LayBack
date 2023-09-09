import { parseISO } from 'date-fns'

export const getFilters = (leagueId: number, homeTeamId: number, awayTeamId: number, initialDate: string, finalDate: string): FixtureFilters => {
  const filters = {} as FixtureFilters

    filters.leagueId = Number(leagueId) ?? undefined
    filters.homeTeamId = Number(homeTeamId) ?? undefined
    filters.awayTeamId = Number(awayTeamId) ?? undefined
    filters.initialDate = initialDate ? parseISO(initialDate.toString()) : undefined
    filters.finalDate = finalDate ? parseISO(finalDate.toString()) : undefined

    return filters
}