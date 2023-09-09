import serviceFixture from '@/services/serviceFixture';
import { ok, error, HttpResponse } from '@/utils/helpers/http'

import { Request, Response } from 'express'
import { parseISO } from 'date-fns'

class ControllerFixture {
  async loadPastFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query
      const filters = this.getFilters(
        Number(leagueId), 
        Number(homeTeamId), 
        Number(awayTeamId), 
        initialDate ? initialDate.toString() : null, 
        finalDate ? finalDate.toString() : null)

      const fixtures =  await serviceFixture.getPastFixtures(filters)
      
      return res.json(ok(fixtures))
    } catch (err) {
      return res.json(error(400, err))
    }
  }

  private getFilters(leagueId: number, homeTeamId: number, awayTeamId: number, initialDate: string, finalDate: string): FixtureFilters {
    const filters = {} as FixtureFilters

    filters.leagueId = Number(leagueId) ?? null
    filters.homeTeamId = Number(homeTeamId) ?? null
    filters.awayTeamId = Number(awayTeamId) ?? null
    filters.initialDate = initialDate ? parseISO(initialDate.toString()) : null
    filters.finalDate = finalDate ? parseISO(finalDate.toString()) : null

    return filters
  }
}

export default new ControllerFixture()
