export class UnauthorizedError extends Error {
  constructor () {
    super('Token is invalid')
    this.name = 'UnauthorizedError'
  }
}
