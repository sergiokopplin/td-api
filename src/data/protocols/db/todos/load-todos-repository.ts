import { Todo } from '@/domain/models'

export interface LoadTodosRepository {
  loadAll: (workspaceId: string) => Promise<LoadTodosRepository.Result[]>
}

export namespace LoadTodosRepository {
  export type Result = Todo
}
