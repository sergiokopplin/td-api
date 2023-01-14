import { TodoWorkspacesId } from '@/domain/models'
import { LoadTodos } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadTodosController implements Controller {
  constructor (private readonly loadTodos: LoadTodos) {}

  async handle (request: LoadTodosController.Request): Promise<HttpResponse> {
    try {
      const result = await this.loadTodos.loadAll(request.workspacesId)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

interface LoadTodosControllerRequest { workspacesId: TodoWorkspacesId }

export namespace LoadTodosController {
  export type Request = LoadTodosControllerRequest
}
