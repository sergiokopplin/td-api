import { SearchQ } from '@/domain/models'
import { SearchTodos } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SearchTodosController implements Controller {
  constructor (private readonly searchTodos: SearchTodos) {}

  async handle (request: SearchTodosController.Request): Promise<HttpResponse> {
    try {
      // TODO: move to data layer
      const result = await this.searchTodos.search({
        ...request,
        workspacesId: parseInt(request.workspacesId, 10)
      })
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SearchTodosController {
  export interface Request {
    workspacesId: string
    q: SearchQ
  }
}
