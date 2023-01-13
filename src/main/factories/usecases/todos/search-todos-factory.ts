import { DbSearchTodos } from '@/data/usecases'
import { TodosMongoRepository } from '@/infra/db'

export const makeDbSearchTodos = (): DbSearchTodos => {
  const todosMongoRepository = new TodosMongoRepository()
  return new DbSearchTodos(todosMongoRepository)
}
