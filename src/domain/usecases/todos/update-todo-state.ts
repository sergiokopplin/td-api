import { Todo, TodoDone } from '@/domain/models'

export interface UpdateTodoState {
  update: (todo: UpdateTodoState.Params) => Promise<UpdateTodoState.Result>
}

export namespace UpdateTodoState {
  export interface Params {
    done: TodoDone
  }
  export interface Result { todo: Todo }
}
