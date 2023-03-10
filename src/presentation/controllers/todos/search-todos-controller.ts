import { type SearchQ, type TodoWorkspacesId } from '@/domain/models'
import { type SearchTodos } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class SearchTodosController implements Controller {
  constructor (private readonly searchTodos: SearchTodos) {}

  async handle (request: SearchTodosController.Request): Promise<HttpResponse> {
    try {
      const result = await this.searchTodos.search(request)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SearchTodosController {
  export interface Request {
    workspacesId: TodoWorkspacesId
    q: SearchQ
  }
}
