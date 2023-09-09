import Fixture from "@/models/Fixture";
import repositoryFixture from '@/data/repositories/fixturesRepository'
import footballApi from "@/data/apis/footballApi";

class ServiceFixture {
  async getPastFixtures(filters: FixtureFilters) {
    const fixtures = await repositoryFixture.getPastFixtures(filters);

    return fixtures;
  }
  
  async getLiveFixtures(filters: FixtureFilters): Promise<Fixture[]> {
    const fixtures = await footballApi.getLiveFixtures()

    return fixtures;
  }
}

export default new ServiceFixture()