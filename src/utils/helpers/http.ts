import { ServerError } from '@/utils/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  result: T
}

export const ok = <T = any> (data?: T): HttpResponse<T> => ({
  statusCode: 200,
  result: data
})

const badRequest = (error: Error): HttpResponse<string> => ({
  statusCode: 400,
  result: error.message
})

const serverError = (error: Error): HttpResponse<string> => ({
  statusCode: 500,
  result: new ServerError(error).message
})

export const error = (statusCode: number, err: Error): HttpResponse<string> => {
  if (statusCode === 400) {
    return badRequest(err)
  }

  return serverError(err)
}
