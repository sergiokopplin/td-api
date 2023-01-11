import { DeleteTodoRepository } from '@/data/protocols'
import { DeleteDoneTodos } from '@/domain/usecases'

export class DbDeleteDoneTodos implements DeleteDoneTodos {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (workspacesId: number): Promise<void> {
    await this.deleteTodoRepository.deleteDone(workspacesId)
  }
}
