import { type SearchTodosRepository } from '@/data/protocols'
import { type SearchQ, type TodoWorkspacesId } from '@/domain/models'
import { type SearchTodos } from '@/domain/usecases'

export class DbSearchTodos implements SearchTodos {
  constructor (private readonly searchTodosRepository: SearchTodosRepository) {}

  async search (params: SearchTodos.Params): Promise<SearchTodos.Result> {
    return await this.searchTodosRepository.search(params)
  }
}

export namespace DbSearchTodos {
  export interface Params {
    workspacesId: TodoWorkspacesId
    q: SearchQ
  }
}
