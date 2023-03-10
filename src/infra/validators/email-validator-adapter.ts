import validator from 'validator'

import { type EmailValidation } from '@/validation/protocols'

export class EmailValidatorAdapter implements EmailValidation {
  validate (email: string): boolean {
    return validator.isEmail(email)
  }
}
