import { type Todo, type TodoDone, type TodoId, type TodoWorkspacesId } from '@/domain/models'

export interface UpdateTodoState {
  updateState: (params: UpdateTodoState.Params) => Promise<UpdateTodoState.Result>
}

export namespace UpdateTodoState {
  export interface Params {
    id: TodoId
    workspacesId: TodoWorkspacesId
    done: TodoDone
  }
  export interface Result { todo: Todo }
}
