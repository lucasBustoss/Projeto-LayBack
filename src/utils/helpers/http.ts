import { ServerError, UnauthorizedError } from '@/utils/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  result: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  result: data
})

const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  result: error
})

const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  result: new UnauthorizedError()
})

const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  result: new ServerError(error)
})

export const error = (err: any): HttpResponse<Error> => {
  if (err.statusCode === 400) {
    return badRequest(err)
  }

  if (err.statusCode === 401) {
    return unauthorized()
  }

  return serverError(err)
}
