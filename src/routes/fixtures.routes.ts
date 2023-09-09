import controllerFixture from '@/controller/controllerFixture'
import { validateInput_fixtures_get } from '@/validations/controllerFixture.validation'

import { Router } from 'express'

const fixtureRouter = Router()

fixtureRouter.get('/', validateInput_fixtures_get, controllerFixture.loadPastFixtures)
fixtureRouter.get('/live', validateInput_fixtures_get, controllerFixture.loadLiveFixtures)
fixtureRouter.get('/fill', controllerFixture.fill)


export default fixtureRouter