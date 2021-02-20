import { Validation } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidator implements Validation {
  constructor (private readonly field: string) {}

  validate (input: any): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
