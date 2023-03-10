import {
  makeUpdateTodoValidation,
  makeDbUpdateTodo,
  makeLogControllerDecorator
} from '@/main/factories'
import { UpdateTodoController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeUpdateTodoController = (): Controller => {
  const controller = new UpdateTodoController(makeUpdateTodoValidation(), makeDbUpdateTodo())
  return makeLogControllerDecorator(controller)
}
