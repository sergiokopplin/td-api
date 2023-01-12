import { Todo, TodoWorkspacesId } from '@/domain/models'

export interface LoadTodosRepository {
  loadAll: (workspacesId: TodoWorkspacesId) => Promise<LoadTodosRepository.Result[]>
}

export namespace LoadTodosRepository {
  export type Result = Todo
}
