export default class OddsLiveResponse {
  fixture: FixtureOdds
  odds: BetOdds[]
}

class FixtureOdds {
  id: number
}

class BetOdds {
  id: number
  name: string
  values: Odds[]
}

class Odds {
  value: string
  odd: string
}