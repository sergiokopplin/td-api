import { type AddTodoRepository } from '@/data/protocols'
import { type AddTodo } from '@/domain/usecases'

export class DbAddTodo implements AddTodo {
  constructor (private readonly addTodoRepository: AddTodoRepository) {}

  async add (todo: AddTodo.Params): Promise<AddTodo.Result> {
    return await this.addTodoRepository.add({
      text: todo.text,
      currentDate: todo.currentDate,
      workspacesId: todo.workspacesId
    })
  }
}
