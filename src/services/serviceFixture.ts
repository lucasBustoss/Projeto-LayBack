import Fixture from "@/models/Fixture";
import repositoryFixture from '@/data/repositories/fixturesRepository'
import footballApi from "@/data/apis/footballApi";
import { addDays, format } from "date-fns";

class ServiceFixture {
  async getPastFixtures(filters: FixtureFilters) {
    const fixtures = await repositoryFixture.getPastFixtures(filters);

    return fixtures;
  }
  
  async getLiveFixtures(filters: FixtureFilters): Promise<Fixture[]> {
    const fixtures = await footballApi.getLiveFixtures(filters)

    return fixtures;
  }

  async fillFixtures(): Promise<Fixture[]> {
    for (let i = 0; i <= 0; i++) {
      const date = addDays(new Date(), i);
      
      const fixtures = await footballApi.fillFixtures(format(date, 'yyyy-MM-dd'))

      await repositoryFixture.save(fixtures)
      return fixtures
    }
  }
}

export default new ServiceFixture()