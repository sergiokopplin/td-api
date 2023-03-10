import { type Decrypter, type LoadAccountByTokenRepository } from '@/data/protocols'
import { type AccountAccessToken, type AccountRole } from '@/domain/models'
import { type LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: AccountAccessToken, role?: AccountRole): Promise<LoadAccountByToken.Result> {
    let token: AccountAccessToken
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
