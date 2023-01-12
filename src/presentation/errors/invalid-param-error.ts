export class InvalidParamError extends Error {
  constructor (field: string) {
    super(`Invalid Params: ${field}`)
    this.name = 'InvalidParamError'
  }
}
