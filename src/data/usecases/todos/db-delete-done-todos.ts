import { DeleteTodoRepository } from '@/data/protocols'
import { DeleteDoneTodos } from '@/domain/usecases'

export class DbDeleteDoneTodos implements DeleteDoneTodos {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (workspaceId: string): Promise<void> {
    await this.deleteTodoRepository.deleteDone(workspaceId)
  }
}
