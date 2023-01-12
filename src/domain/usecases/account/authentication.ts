import { Account, AccountAccessToken } from '@/domain/models'

export interface Authentication {
  auth: (account: Authentication.Params) => Promise<Authentication.Result>
}

type AuthenticationResult = Pick<Account, 'name'> & {
  accessToken: AccountAccessToken
}

export namespace Authentication {
  export type Params = Account
  export type Result = AuthenticationResult
}
