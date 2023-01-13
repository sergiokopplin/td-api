import { DbUpdateTodoState } from '@/data/usecases'
import { TodosMongoRepository } from '@/infra/db'

export const makeDbUpdateTodoState = (): DbUpdateTodoState => {
  const todosMongoRepository = new TodosMongoRepository()
  return new DbUpdateTodoState(todosMongoRepository)
}
