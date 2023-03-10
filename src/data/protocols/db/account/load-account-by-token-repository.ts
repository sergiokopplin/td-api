import { type AccountAccessToken, type AccountRole } from '@/domain/models'

export interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: AccountAccessToken, role?: AccountRole) => Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export interface Result {
    id: string
  }
}
