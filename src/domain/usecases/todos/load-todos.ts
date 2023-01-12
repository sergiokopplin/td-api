import { Todo, TodoWorkspacesId } from '@/domain/models'

export interface LoadTodos {
  loadAll: (workspacesId: TodoWorkspacesId) => Promise<LoadTodos.Result>
}

export namespace LoadTodos {
  export type Result = Todo[]
}
