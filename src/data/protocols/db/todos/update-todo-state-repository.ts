import { Todo, TodoDone, TodoId, TodoWorkspacesId } from '@/domain/models'

export interface UpdateTodoStateRepository {
  updateState: (params: UpdateTodoStateRepository.Params) => Promise<UpdateTodoStateRepository.Result>
}

export namespace UpdateTodoStateRepository {
  export interface Params {
    id: TodoId
    workspacesId: TodoWorkspacesId
    done: TodoDone
  }
  export interface Result { todo: Todo }
}
