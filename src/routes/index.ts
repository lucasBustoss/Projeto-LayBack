import fixtureRouter from '@/routes/fixtures.routes'

import { Router } from 'express';

const routes = Router();

routes.use('/fixtures', fixtureRouter)

export default routes;
