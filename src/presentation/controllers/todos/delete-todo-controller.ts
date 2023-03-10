import { type Todo } from '@/domain/models'
import { type DeleteTodo } from '@/domain/usecases'
import { badRequestError, serverError, noResult } from '@/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'

export class DeleteTodoController implements Controller {
  constructor (private readonly validation: Validation, private readonly deleteTodo: DeleteTodo) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      await this.deleteTodo.delete(request)
      return noResult()
    } catch (error) {
      return serverError(error)
    }
  }
}

type DeleteTodoControllerRequest = Pick<Todo, 'id'>

export namespace DeleteTodoController {
  export type Request = DeleteTodoControllerRequest
}
