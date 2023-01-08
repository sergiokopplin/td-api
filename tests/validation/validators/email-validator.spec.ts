import { faker } from '@faker-js/faker'

import { InvalidParamError } from '@/presentation/errors'
import { EmailValidationSpy } from '@/tests/validation/mocks'
import { EmailValidator } from '@/validation/validators'

interface SutTypes {
  sut: EmailValidator
  emailValidationSpy: EmailValidationSpy
}

const makeSut = (): SutTypes => {
  const emailValidationSpy = new EmailValidationSpy()
  const sut = new EmailValidator('email', emailValidationSpy)

  return {
    sut,
    emailValidationSpy
  }
}

describe('EmailValidator', () => {
  test('Should return an error if validation fails', () => {
    const { sut, emailValidationSpy } = makeSut()
    emailValidationSpy.result = false
    expect(sut.validate({ email: 'invalid_email.com' })).toEqual(new InvalidParamError('email'))
  })

  test('Should return empty if validation is ok', () => {
    const { sut } = makeSut()
    expect(sut.validate({ email: faker.internet.email() })).toBeFalsy()
  })

  test('Should return empty validation if optional', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).toBeFalsy()
  })
})
