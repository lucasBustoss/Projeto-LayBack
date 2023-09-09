export default class ApiResponse<T> {
  results: number
  paging: PagingResponse
  response: T[]
}

class PagingResponse {
  current: number
  total: number
}