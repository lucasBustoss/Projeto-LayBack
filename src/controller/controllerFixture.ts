import serviceFixture from '@/services/serviceFixture';
import { getLiveFilters, getPastFilters } from '@/utils/helpers/filters';
import { ok, error, HttpResponse } from '@/utils/helpers/http'

import { Request, Response } from 'express'

class ControllerFixture {
  async loadPastFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query
      const filters = getPastFilters(
        Number(leagueId), 
        Number(homeTeamId), 
        Number(awayTeamId), 
        initialDate ? initialDate.toString() : null, 
        finalDate ? finalDate.toString() : null)

      const fixtures = await serviceFixture.getPastFixtures(filters)
      
      return res.json(ok(fixtures))
    } catch (err) {
      console.log(err)
      return res.json(error(400, err))
    }
  }

  async loadLiveFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const { leagueId, homeTeamId, awayTeamId } = req.query
      const filters = getLiveFilters(
        Number(leagueId), 
        Number(homeTeamId), 
        Number(awayTeamId))

      const fixtures = await serviceFixture.getLiveFixtures(filters)
      
      return res.json(ok(fixtures))
    } catch (err) {
      console.log(err)
      return res.json(error(400, err))
    }
  }

  async saveFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const response = await serviceFixture.saveFixtures()
      console.log('controller')
      
      return res.json(ok(response))
    } catch (err) {
      console.log(err)
      return res.json(error(400, err))
    }
  }
}

export default new ControllerFixture()
