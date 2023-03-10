import {
  makeLoginValidation,
  makeDbAuthentication,
  makeLogControllerDecorator
} from '@/main/factories'
import { LoginController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
