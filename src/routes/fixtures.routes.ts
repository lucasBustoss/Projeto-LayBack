import controllerFixture from '@/controller/controllerFixture'
import { ok, error } from '@/utils/helpers/http'

import { Router } from 'express'

const fixtureRouter = Router()

fixtureRouter.get('/', async (req, res) => {
  try {
    const fixtures = await controllerFixture.loadPastFixtures(req);

    return res.json(ok(fixtures))
  } catch (err) {
    return res.status(400).json(error(400, err))
  }
})

export default fixtureRouter