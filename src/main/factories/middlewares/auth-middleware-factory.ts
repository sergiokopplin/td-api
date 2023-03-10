import { makeDbLoadAccountByToken } from '@/main/factories'
import { AuthMiddleware } from '@/presentation/middlewares'
import { type Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
