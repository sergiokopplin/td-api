import { type Account } from '@/domain/models'
import { type AddAccount, type Authentication } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'
import { serverError, forbiddenError, badRequestError, ok } from '@/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const isValid = await this.addAccount.add(request)
      if (!isValid) {
        return forbiddenError(new EmailInUseError())
      }
      const account = await this.authentication.auth(request)
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

type SignUpControllerRequest = Pick<Account, 'name' | 'email' | 'password'> & {
  passwordConfirmation: string
}

export namespace SignUpController {
  export type Request = SignUpControllerRequest
}
