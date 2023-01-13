import { LoadTodos } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadTodosController implements Controller {
  constructor (private readonly loadTodos: LoadTodos) {}

  async handle (request: LoadTodosController.Request): Promise<HttpResponse> {
    try {
      const result = await this.loadTodos.loadAll(parseInt(request.workspacesId, 10))
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

interface LoadTodosControllerRequest { workspacesId: string }

export namespace LoadTodosController {
  export type Request = LoadTodosControllerRequest
}
