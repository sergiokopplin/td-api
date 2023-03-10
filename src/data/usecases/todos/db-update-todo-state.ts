import { type UpdateTodoStateRepository } from '@/data/protocols'
import { type UpdateTodoState } from '@/domain/usecases'

export class DbUpdateTodoState implements UpdateTodoState {
  constructor (private readonly updateTodoRepository: UpdateTodoStateRepository) {}
  async updateState (params: UpdateTodoState.Params): Promise<UpdateTodoState.Result> {
    const result = await this.updateTodoRepository.updateState(params)
    return result
  }
}
