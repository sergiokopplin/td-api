import { type LoadTodoRepository } from '@/data/protocols'
import { type LoadTodo } from '@/domain/usecases'

export class DbLoadTodo implements LoadTodo {
  constructor (private readonly loadTodoRepository: LoadTodoRepository) {}

  async load (todo: LoadTodo.Params): Promise<LoadTodo.Result> {
    return await this.loadTodoRepository.load(todo)
  }
}
