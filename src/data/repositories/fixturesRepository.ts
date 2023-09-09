import Fixture from "@/models/Fixture";

class RepositoryFixture {
  async getPastFixtures(filters: FixtureFilters): Promise<Fixture[]> {
    const fixtures = [] as Fixture[]

    return fixtures
  }
}

export default new RepositoryFixture()