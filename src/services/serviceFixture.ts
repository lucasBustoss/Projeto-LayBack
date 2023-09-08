import Fixture from "@/models/Fixture";

class ServiceFixture {
  async getPastFixtures(leagueId: number, homeTeamId: number, awayTeamId: number, initialDate: Date, finalDate: Date) {
    const fixtures = [] as Fixture[]

    return fixtures;
  }
  
  async getLiveFixtures(leagueId: number, homeTeamId: number, awayTeamId: number): Promise<Fixture[]> {
    const fixtures = [] as Fixture[]

    return fixtures;
  }
}

export default new ServiceFixture()