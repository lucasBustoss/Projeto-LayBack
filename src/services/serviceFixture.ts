import Fixture from "@/models/Fixture";
import repositoryFixture from '@/data/repositories/fixturesRepository'

class ServiceFixture {
  async getPastFixtures(filters: FixtureFilters) {
    const fixtures = await repositoryFixture.getPastFixtures(filters);

    return fixtures;
  }
  
  async getLiveFixtures(leagueId: number, homeTeamId: number, awayTeamId: number): Promise<Fixture[]> {
    const fixtures = [] as Fixture[]

    return fixtures;
  }
}

export default new ServiceFixture()