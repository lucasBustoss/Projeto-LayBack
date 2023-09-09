import Fixture from "@/models/Fixture";
import repositoryFixture from '@/data/repositories/fixturesRepository'
import footballApi from "@/data/apis/footballApi";
import { format, subDays } from "date-fns";

class ServiceFixture {
  async getPastFixtures(filters: FixtureFilters) {
    const fixtures = await repositoryFixture.getPastFixtures(filters);

    return fixtures;
  }
  
  async getLiveFixtures(filters: FixtureFilters): Promise<Fixture[]> {
    const fixtures = await footballApi.getLiveFixtures(filters)

    return fixtures;
  }

  async saveFixtures(): Promise<void> {
    for (let i = 0; i <= 7; i++) {
      const date = subDays(new Date(), i);
      
      const fixtures = await footballApi.saveFixtures(format(date, 'yyyy-MM-dd'))

      await repositoryFixture.save(fixtures)
    }
  }
}

export default new ServiceFixture()