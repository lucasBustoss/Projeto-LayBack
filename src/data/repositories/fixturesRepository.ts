import { FixturePastFilters } from "@/models/filters";
import Fixture from "@/models/Fixture";
import { FixtureSchema } from "@/models/schemas/schemaFixture";
import { removeUnnecessaryFields } from "@/utils/helpers/mongo";

class RepositoryFixture {
  async getPastFixtures(filters: FixturePastFilters): Promise<Fixture[]> {
    const documents = await 
      FixtureSchema
      .find(filters)
      .select(removeUnnecessaryFields())

    return documents
  }

  async save(fixtures: Fixture[]): Promise<void> {
    const updateData = fixtures.map(fixture => ({
      updateOne: {
        filter: { id: fixture.id },
        update: { $set: fixture },
        upsert: true,
      },
    }));
    
    await FixtureSchema.bulkWrite(updateData);
  }

}

export default new RepositoryFixture()