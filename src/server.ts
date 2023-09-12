import './config/module-alias'
import * as dotenv from 'dotenv';
import cors from 'cors';

const { specs, swaggerUi } = require('./config/swagger');

const path = '.env';
dotenv.config({ path });

import express from 'express'
import routes from './routes'

import mongoose from 'mongoose'

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));
mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
  })
  .catch(console.error)