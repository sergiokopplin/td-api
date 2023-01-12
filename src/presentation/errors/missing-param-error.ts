export class MissingParamError extends Error {
  constructor (field: string) {
    super(`Missing Params: ${field}`)
    this.name = 'MissingParamError'
  }
}
