import {
  makeUpdateTodoStateValidation,
  makeLogControllerDecorator,
  makeDbUpdateTodoState
} from '@/main/factories'
import { UpdateTodoStateController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateTodoStateController = (): Controller => {
  const controller = new UpdateTodoStateController(makeUpdateTodoStateValidation(), makeDbUpdateTodoState())
  return makeLogControllerDecorator(controller)
}
