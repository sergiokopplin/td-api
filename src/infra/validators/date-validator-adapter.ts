import validator from 'validator'

import { type DateValidation } from '@/validation/protocols'

export class DateValidatorAdapter implements DateValidation {
  validate (date: Date): boolean {
    return validator.isISO8601(date.toString())
  }
}
