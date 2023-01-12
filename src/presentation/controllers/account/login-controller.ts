import { Account } from '@/domain/models'
import { Authentication } from '@/domain/usecases'
import { badRequestError, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

type LoginControllerRequest = Pick<Account, 'email' | 'password'>

export namespace LoginController {
  export type Request = LoginControllerRequest
}
