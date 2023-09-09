import serviceFixture from '@/services/serviceFixture';
import { getFilters } from '@/utils/helpers/filters';
import { ok, error, HttpResponse } from '@/utils/helpers/http'

import { Request, Response } from 'express'

class ControllerFixture {
  async loadPastFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query
      const filters = getFilters(
        Number(leagueId), 
        Number(homeTeamId), 
        Number(awayTeamId), 
        initialDate ? initialDate.toString() : null, 
        finalDate ? finalDate.toString() : null)

      const fixtures =  await serviceFixture.getPastFixtures(filters)
      
      return res.json(ok(fixtures))
    } catch (err) {
      console.log(err.message)
      return res.json(error(400, err))
    }
  }

  async loadLiveFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query
      const filters = getFilters(
        Number(leagueId), 
        Number(homeTeamId), 
        Number(awayTeamId), 
        initialDate ? initialDate.toString() : null, 
        finalDate ? finalDate.toString() : null)

      const fixtures =  await serviceFixture.getLiveFixtures(filters)
      
      return res.json(ok(fixtures))
    } catch (err) {
      console.log(err.message)
      return res.json(error(400, err))
    }
  }

  async saveFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const fixtures =  await serviceFixture.saveFixtures()
      
      return res.json(ok('Fixtures saved'))
    } catch (err) {
      console.log(err.message)
      return res.json(error(400, err))
    }
  }
}

export default new ControllerFixture()
