import { makeDbSearchTodos, makeLogControllerDecorator } from '@/main/factories'
import { SearchTodosController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSearchTodosController = (): Controller => {
  const controller = new SearchTodosController(makeDbSearchTodos())
  return makeLogControllerDecorator(controller)
}
