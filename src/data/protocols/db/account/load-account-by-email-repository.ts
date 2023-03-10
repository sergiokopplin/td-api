import { type Account, type AccountEmail, type AccountId } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: AccountEmail) => Promise<LoadAccountByEmailRepository.Result>
}

type LoadAccountByEmailRepositoryResult = Pick<Account, 'name' | 'password'> & {
  id: AccountId
}

export namespace LoadAccountByEmailRepository {
  export type Result = LoadAccountByEmailRepositoryResult
}
