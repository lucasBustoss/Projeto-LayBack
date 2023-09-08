import Team from "./Team";
import League from './League'

export default class Fixture {
  league: League;
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamOdds: number;
  awayTeamOdds: number;
  drawOdds: number;
}