import { LoadTodosRepository } from '@/data/protocols'
import { LoadTodos } from '@/domain/usecases'

export class DbLoadTodos implements LoadTodos {
  constructor (private readonly loadTodosRepository: LoadTodosRepository) {}

  async loadAll (workspaceId: string): Promise<LoadTodos.Result> {
    return await this.loadTodosRepository.loadAll(workspaceId)
  }
}

export namespace DbLoadTodos {
  export interface Param {
    workspaceId: string
  }
}
