import Fixture from "@/models/Fixture";
import repositoryFixture from '@/data/repositories/fixturesRepository'
import footballApi from "@/data/apis/footballApi";
import { format, subDays } from "date-fns";
import { FixtureLiveFilters, FixturePastFilters } from "@/models/filters";

class ServiceFixture {
  async getPastFixtures(filters: FixturePastFilters) {
    const fixtures = await repositoryFixture.getPastFixtures(filters);

    return fixtures;
  }
  
  async getLiveFixtures(filters: FixtureLiveFilters): Promise<Fixture[]> {
    const fixtures = await footballApi.getLiveFixtures(filters)

    return fixtures;
  }

  async saveFixtures(): Promise<string> {
    for (let i = 0; i <= 3; i++) {
      console.log(i)
      console.log(new Date())
      const date = subDays(new Date(), i);
      
      const fixtures = await footballApi.saveFixtures(format(date, 'yyyy-MM-dd'))

      await repositoryFixture.save(fixtures)
      console.log('salvei')
    }

    console.log('termineiService')
    return 'Fixtures saved'
  }
}

export default new ServiceFixture()