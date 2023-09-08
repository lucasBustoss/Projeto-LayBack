import { isValid, parse } from 'date-fns'

export const isNumber = (num: any): boolean => {
  return ( num !== null && num !== '' && !isNaN(Number(num.toString())))
}

export const isDate = (date: any): boolean => {
  const dateFormatted = parse(date, 'yyyy-MM-dd', new Date())

  return isValid(dateFormatted)
}