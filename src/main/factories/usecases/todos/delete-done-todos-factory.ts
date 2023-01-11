import { DbDeleteDoneTodos } from '@/data/usecases'
import { TodosMongoRepository } from '@/infra/db'

export const makeDbDeleteDoneTodos = (): DbDeleteDoneTodos => {
  const todosMongoRepository = new TodosMongoRepository()
  return new DbDeleteDoneTodos(todosMongoRepository)
}
