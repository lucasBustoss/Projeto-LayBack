import Fixture from '@/models/Fixture';
import serviceFixture from '@/services/serviceFixture';
import { ok, error, HttpResponse } from '@/utils/helpers/http'

import { Request, Response } from 'express'

class ControllerFixture {
  async loadPastFixtures (req: Request, res: Response): Promise<Response<HttpResponse>> {
    try {
      const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query
      
      const fixtures =  await serviceFixture.getPastFixtures(
        Number(leagueId), 
        Number(homeTeamId), 
        Number(awayTeamId), 
        initialDate, 
        finalDate)
      
      return res.json(ok(fixtures))
    } catch (err) {
      return res.json(error(400, err))
    }
  }
}

export default new ControllerFixture()
