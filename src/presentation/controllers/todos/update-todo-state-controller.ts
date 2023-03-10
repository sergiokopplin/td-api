import { type UpdateTodoState } from '@/domain/usecases'
import { type Todo } from '@/domain/models'
import { badRequestError, ok, serverError, notFoundError } from '@/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'

export class UpdateTodoStateController implements Controller {
  constructor (private readonly validation: Validation, private readonly updateTodoState: UpdateTodoState) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.updateTodoState.updateState(request)
      if (!result) {
        return notFoundError()
      }
      return result && ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

type UpdateTodoStateControllerRequest = Pick<Todo, 'id' | 'workspacesId' | 'done'>

export namespace UpdateTodoStateController {
  export type Request = UpdateTodoStateControllerRequest
}
