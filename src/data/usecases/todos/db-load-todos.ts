import { LoadTodosRepository } from '@/data/protocols'
import { Todo, TodoWorkspacesId } from '@/domain/models'
import { LoadTodos } from '@/domain/usecases'

export class DbLoadTodos implements LoadTodos {
  constructor (private readonly loadTodosRepository: LoadTodosRepository) {}

  async loadAll (workspacesId: TodoWorkspacesId): Promise<LoadTodos.Result> {
    return await this.loadTodosRepository.loadAll(workspacesId)
  }
}

type DbLoadTodosParam = Pick<Todo, 'workspacesId'>

export namespace DbLoadTodos {
  export type Params = DbLoadTodosParam
}
