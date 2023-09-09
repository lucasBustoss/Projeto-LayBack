import mongoose from 'mongoose'
import Fixture from '../Fixture'

const LeagueSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const TeamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const FixtureSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    league: LeagueSchema,
    homeTeam: TeamSchema,
    awayTeam: TeamSchema,
    homeTeamGoals: {
      type: Number,
      required: true
    },
    awayTeamGoals: {
      type: Number,
      required: true
    },
    homeOdds: {
      type: Number,
      required: true
    },
    drawOdds: {
      type: Number,
      required: true
    },
    awayOdds: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const schema = mongoose.model<Fixture>(
  'Fixtures',
  FixtureSchema
)

export { schema as FixtureSchema }