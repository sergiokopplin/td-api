import { type DeleteTodoRepository } from '@/data/protocols'
import { type TodoWorkspacesId } from '@/domain/models'
import { type DeleteDoneTodos } from '@/domain/usecases'

export class DbDeleteDoneTodos implements DeleteDoneTodos {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (workspacesId: TodoWorkspacesId): Promise<void> {
    await this.deleteTodoRepository.deleteDone(workspacesId)
  }
}
