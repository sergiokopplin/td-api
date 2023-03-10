import { makeDbLoadTodos, makeLogControllerDecorator } from '@/main/factories'
import { LoadTodosController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeLoadTodosController = (): Controller => {
  const controller = new LoadTodosController(makeDbLoadTodos())
  return makeLogControllerDecorator(controller)
}
