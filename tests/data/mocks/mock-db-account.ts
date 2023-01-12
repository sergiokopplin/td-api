import { faker } from '@faker-js/faker'

import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'
import { Account, AccountEmail, AccountId, AccountRole, AccountAccessToken } from '@/domain/models'

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
  token: AccountAccessToken
  role: AccountRole
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (token: AccountAccessToken, role?: AccountRole): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: AccountId
  token: AccountAccessToken

  async updateAccessToken (id: AccountId, token: AccountAccessToken): Promise<void> {
    this.id = id
    this.token = token
  }
}
