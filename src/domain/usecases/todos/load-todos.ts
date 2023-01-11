import { Todo } from '@/domain/models'

export interface LoadTodos {
  loadAll: (workspacesId: number) => Promise<LoadTodos.Result>
}

export namespace LoadTodos {
  export type Result = Todo[]
}
