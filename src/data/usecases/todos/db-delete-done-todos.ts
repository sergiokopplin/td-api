import { DeleteTodoRepository } from '@/data/protocols'
import { TodoWorkspacesId } from '@/domain/models'
import { DeleteDoneTodos } from '@/domain/usecases'

export class DbDeleteDoneTodos implements DeleteDoneTodos {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (workspacesId: TodoWorkspacesId): Promise<void> {
    await this.deleteTodoRepository.deleteDone(workspacesId)
  }
}