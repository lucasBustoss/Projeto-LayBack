import { FixturePastFilters } from "@/models/filters";
import Fixture from "@/models/Fixture";
import { FixtureSchema } from "@/models/schemas/schemaFixture";

class RepositoryFixture {
  async getPastFixtures(filters: FixturePastFilters): Promise<Fixture[]> {
    const fixtures = await FixtureSchema.find(filters)

    return fixtures
  }

  async save(fixtures: Fixture[]): Promise<void> {
    for (const fixture of fixtures) {
      const filter = { id: fixture.id }

      await FixtureSchema.findOneAndUpdate(filter, fixture, {
        new: true,
        upsert: true
      })
    }
  }

}

export default new RepositoryFixture()