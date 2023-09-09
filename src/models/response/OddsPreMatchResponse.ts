export default class OddsPreMatchResponse {
  bookmakers: Bookmakers[]
}

class Bookmakers {
  id: number
  bets: BetOdds[]
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