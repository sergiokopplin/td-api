import bcrypt from 'bcrypt'
import faker from 'faker'

import { BcryptAdapter } from '@/infra/criptography'

interface SutTypes {
  sut: BcryptAdapter
}

const salt = 12

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(salt)

  return {
    sut
  }
}

describe('HasherAdapter', () => {
  test('Should call bcrypt with correct params', async () => {
    const { sut } = makeSut()
    const password = faker.internet.password()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })
})
