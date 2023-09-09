export class FixturePastFilters {
  ['league.id']: number
  ['homeTeam.id']: number
  ['awayTeam.id']: number
  date?: DateFilter
}

export class DateFilter {
  $gte: Date
  $lte: Date
}