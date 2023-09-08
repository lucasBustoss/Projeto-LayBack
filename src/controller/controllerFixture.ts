import Fixture from '@/models/Fixture';
import serviceFixture from '@/services/serviceFixture';
import { isNumber, isDate } from '@/utils/helpers/validations';

class ControllerFixture {
  async loadPastFixtures (req: any): Promise<Fixture[]> {
    const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query

    //#region Validations

    if (!isNumber(leagueId)) {
      throw new Error(`O parâmetro 'leagueId' deve ser um número.`)
    }
    if (!isNumber(homeTeamId)) {
      throw new Error(`O parâmetro 'homeTeamId' deve ser um número.`)
    }
    if (!isNumber(awayTeamId)) {
      throw new Error(`O parâmetro 'awayTeamId' deve ser um número.`)
    }

    if(initialDate && !finalDate) {
      throw new Error(`É necessário informar a data final.`)
    }

    if (!initialDate && finalDate) {
      throw new Error(`É necessário informar a data inicial.`)
    }

    if(initialDate && !isDate(initialDate)) {
      throw new Error(`O parâmetro 'initialDate' deve estar no formato 'yyyy-MM-dd'.`)
    }

    if(finalDate && !isDate(finalDate)) {
      throw new Error(`O parâmetro 'finalDate' deve estar no formato 'yyyy-MM-dd'.`)
    }

    //#endregion

    return await serviceFixture.getPastFixtures(leagueId, homeTeamId, awayTeamId, initialDate, finalDate)
  }
}

export default new ControllerFixture()
