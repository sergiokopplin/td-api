import { Todo, TodoDone } from '@/domain/models'

export interface UpdateTodoStateRepository {
  update: (todo: UpdateTodoStateRepository.Params) => Promise<UpdateTodoStateRepository.Result>
}

export namespace UpdateTodoStateRepository {
  export interface Params {
    done: TodoDone
  }
  export interface Result { todo: Todo }
}
