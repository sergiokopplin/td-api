import { type Account } from '@/domain/models'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

type AddAccountParams = Pick<Account, 'name' | 'email' | 'password'>

export namespace AddAccount {
  export type Params = AddAccountParams
  export type Result = boolean
}
