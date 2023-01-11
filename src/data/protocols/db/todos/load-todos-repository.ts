import { Todo } from '@/domain/models'

export interface LoadTodosRepository {
  loadAll: (workspacesId: number) => Promise<LoadTodosRepository.Result[]>
}

export namespace LoadTodosRepository {
  export type Result = Todo
}
