import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequestError, ok, serverError } from '@/presentation/helpers'
import { UpdateTodo } from '@/domain/usecases'

export class UpdateTodoController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateTodo: UpdateTodo
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.updateTodo.update(request)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateTodoController {
  export interface Request {
    id: string
    title: string
    completed: boolean
  }
}
