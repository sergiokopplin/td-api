import { type AccountEmail } from '@/domain/models'

export interface CheckAccountByEmailRepository {
  checkByEmail: (email: AccountEmail) => Promise<CheckAccountByEmailRepository.Result>
}

export namespace CheckAccountByEmailRepository {
  export type Result = boolean
}
