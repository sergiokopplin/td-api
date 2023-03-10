import {
  makeLoadTodoValidation,
  makeDbLoadTodo,
  makeLogControllerDecorator
} from '@/main/factories'
import { LoadTodoController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeLoadTodoController = (): Controller => {
  const controller = new LoadTodoController(makeLoadTodoValidation(), makeDbLoadTodo())
  return makeLogControllerDecorator(controller)
}
