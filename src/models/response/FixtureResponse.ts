export default class FixtureResponse {
  fixture: FixtureApi
  league: LeagueApi
  teams: TeamsApi
  goals: GoalsApi
}

class FixtureApi {
  id: number
}

class LeagueApi {
  id: number
  name: string
}

class TeamsApi {
  home: TeamDetailApi
  away: TeamDetailApi
}

class TeamDetailApi {
  id: number
  name: string
}

class GoalsApi {
  home: number
  away: number
}