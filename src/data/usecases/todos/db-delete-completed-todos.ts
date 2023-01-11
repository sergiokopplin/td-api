import { DeleteTodoRepository } from '@/data/protocols'
import { DeleteCompletedTodos } from '@/domain/usecases'

export class DbDeleteCompletedTodos implements DeleteCompletedTodos {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (workspaceId: string): Promise<void> {
    await this.deleteTodoRepository.deleteCompleted(workspaceId)
  }
}
