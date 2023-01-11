import { LoadTodosRepository } from '@/data/protocols'
import { LoadTodos } from '@/domain/usecases'

export class DbLoadTodos implements LoadTodos {
  constructor (private readonly loadTodosRepository: LoadTodosRepository) {}

  async loadAll (workspacesId: number): Promise<LoadTodos.Result> {
    return await this.loadTodosRepository.loadAll(workspacesId)
  }
}

export namespace DbLoadTodos {
  export interface Param {
    workspacesId: number
  }
}
