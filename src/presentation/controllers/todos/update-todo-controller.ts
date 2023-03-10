import { type UpdateTodo } from '@/domain/usecases'
import { type Todo } from '@/domain/models'
import { badRequestError, ok, serverError, notFoundError } from '@/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'

export class UpdateTodoController implements Controller {
  constructor (private readonly validation: Validation, private readonly updateTodo: UpdateTodo) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.updateTodo.update(request)
      if (!result) {
        return notFoundError()
      }
      return result && ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

type UpdateTodoControllerRequest = Pick<Todo, 'id' | 'text' | 'done'>

export namespace UpdateTodoController {
  export type Request = UpdateTodoControllerRequest
}
