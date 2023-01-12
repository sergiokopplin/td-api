import { Todo } from '@/domain/models'
import { LoadTodo } from '@/domain/usecases'
import { badRequestError, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadTodoController implements Controller {
  constructor (private readonly validation: Validation, private readonly loadTodo: LoadTodo) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.loadTodo.load(request)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

type LoadTodoControllerRequest = Pick<Todo, 'id'>

export namespace LoadTodoController {
  export type Request = LoadTodoControllerRequest
}
