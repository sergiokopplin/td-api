import { type AccountAccessToken, type AccountId } from '@/domain/models'

export interface UpdateAccessTokenRepository {
  updateAccessToken: (id: AccountId, token: AccountAccessToken) => Promise<void>
}
