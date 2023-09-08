import { isNumber, isDate } from '@/utils/helpers/validations';
import { error } from '@/utils/helpers/http'

import { Request, Response, NextFunction } from 'express'

export const validateInput_fixtures_get = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { leagueId, homeTeamId, awayTeamId, initialDate, finalDate } = req.query
    
    if (leagueId && !isNumber(leagueId)) {
      throw new Error(`O parâmetro 'leagueId' deve ser um número.`)
    }
    if (homeTeamId && !isNumber(homeTeamId)) {
      throw new Error(`O parâmetro 'homeTeamId' deve ser um número.`)
    }
    if (awayTeamId && !isNumber(awayTeamId)) {
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
    
    next()
  } catch (err) {
    return res.status(400).json(error(400, err))
  }
}