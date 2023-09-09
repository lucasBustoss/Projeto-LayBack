import Fixture from "@/models/Fixture";
import FixtureToFill from "@/models/FixtureToFill";
import { FixtureSchema } from "@/models/schemas/schemaFixture";
import { FixtureToFillSchema } from "@/models/schemas/schemaFixtureToFill";

class RepositoryFixture {
  async getPastFixtures(filters: FixtureFilters): Promise<Fixture[]> {
    const fixtures = [] as Fixture[]

    return fixtures
  }

  async save(fixtures: Fixture[]): Promise<void> {
    await FixtureSchema.create(fixtures);
  }

}

export default new RepositoryFixture()