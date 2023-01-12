import { faker } from '@faker-js/faker'

import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'
import { Account, AccountEmail } from '@/domain/models'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: AccountEmail
  result = false

  async checkByEmail (email: AccountEmail): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  account: Account
  result = true

  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.account = account
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: AccountEmail
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: AccountEmail): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
