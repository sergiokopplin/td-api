import { Todo } from '@/domain/models'

export interface AddTodoRepository {
  add: (todo: AddTodoRepository.Params) => Promise<AddTodoRepository.Result>
}

export namespace AddTodoRepository {
  export type Result = Todo

  export interface Params {
    title: string
    currentDate?: Date
    accountId: string
  }
}
