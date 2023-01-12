export type AccountEmail = string
export type AccountAccessToken = string
export type AccountId = string

export interface Account {
  name: string
  email: AccountEmail
  password: string
}
