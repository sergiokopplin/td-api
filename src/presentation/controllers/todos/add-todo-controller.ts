import { type Todo } from '@/domain/models'
import { type AddTodo } from '@/domain/usecases'
import { badRequestError, created, serverError } from '@/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'

export class AddTodoController implements Controller {
  constructor (private readonly validation: Validation, private readonly addTodo: AddTodo) {}

  async handle (request: AddTodoController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const todo = await this.addTodo.add(request)
      return created(todo)
    } catch (error) {
      return serverError(error)
    }
  }
}

type AddTodoControllerRequest = Pick<Todo, 'text' | 'currentDate' | 'workspacesId'>

export namespace AddTodoController {
  export type Request = AddTodoControllerRequest
}
