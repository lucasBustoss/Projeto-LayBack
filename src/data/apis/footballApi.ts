import Fixture from '@/models/Fixture';
import axios from 'axios';

class FootballApi {
  private readonly api = axios.create({ baseURL: 'https://api-football-v1.p.rapidapi.com/v3' })
  private readonly apiKey = process.env.FOOTBALL_API_KEY
  private readonly timezone = 'America/Sao_Paulo'

  async getLiveFixtures(): Promise<Fixture[]> {
    try {
      const config = {
        params: {
          timezone: this.timezone,
          live: 'all'
        },
        headers: {
          "X-RapidApi-Key": this.apiKey
        }
      }

      const response = await this.api.get(
        '/fixtures',
        config
      )
      
      if(response && response.data)
        return this.getTreatedFixtures(response.data);
    } catch (err) {

    }
  }

  private getTreatedFixtures(apiFixtures: any): Fixture[] {
    const fixtures = [] as Fixture[]

    return fixtures
  }
}

export default new FootballApi()