import { type Todo } from '@/domain/models'
import { type DeleteDoneTodos } from '@/domain/usecases'
import { serverError, noResult } from '@/presentation/helpers'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class DeleteDoneTodosController implements Controller {
  constructor (private readonly deleteDoneTodos: DeleteDoneTodos) {}

  async handle (request: DeleteDoneTodosController.Request): Promise<HttpResponse> {
    try {
      await this.deleteDoneTodos.delete(request.workspacesId)
      return noResult()
    } catch (error) {
      return serverError(error)
    }
  }
}

type DeleteDoneTodosControllerRequest = Pick<Todo, 'workspacesId'>

export namespace DeleteDoneTodosController {
  export type Request = DeleteDoneTodosControllerRequest
}
