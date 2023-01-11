import { DeleteDoneTodos } from '@/domain/usecases'
import { serverError, noResult } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class DeleteDoneTodosController implements Controller {
  constructor (private readonly deleteDoneTodos: DeleteDoneTodos) {}

  async handle (request: DeleteDoneTodosController.Request): Promise<HttpResponse> {
    try {
      await this.deleteDoneTodos.delete(request.workspaceId)
      return noResult()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteDoneTodosController {
  export interface Request {
    workspaceId: string
  }
}
