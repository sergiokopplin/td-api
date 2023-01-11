import { makeDbDeleteDoneTodos, makeLogControllerDecorator } from '@/main/factories'
import { DeleteDoneTodosController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteDoneTodosController = (): Controller => {
  const controller = new DeleteDoneTodosController(makeDbDeleteDoneTodos())
  return makeLogControllerDecorator(controller)
}
