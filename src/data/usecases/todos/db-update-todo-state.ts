import { UpdateTodoStateRepository } from '@/data/protocols'
import { UpdateTodoState } from '@/domain/usecases'

export class DbUpdateTodoState implements UpdateTodoState {
  constructor (private readonly updateTodoRepository: UpdateTodoStateRepository) {}
  async update (todo: UpdateTodoState.Params): Promise<UpdateTodoState.Result> {
    return await this.updateTodoRepository.update(todo)
  }
}
