import { UpdateTodoState } from '@/domain/usecases'
import { Todo } from '@/domain/models'
import { badRequestError, ok, serverError, notFoundError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateTodoStateController implements Controller {
  constructor (private readonly validation: Validation, private readonly updateTodoState: UpdateTodoState) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      // TODO: move to data layer
      const result = await this.updateTodoState.updateState({
        ...request,
        workspacesId: parseInt(request.workspacesId, 10)
      })
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
