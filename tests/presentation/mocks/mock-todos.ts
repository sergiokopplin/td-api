import { faker } from '@faker-js/faker'

import { Todo } from '@/domain/models'
import {
  AddTodo,
  DeleteTodo,
  DeleteDoneTodos,
  UpdateTodo,
  LoadTodos,
  LoadTodo
} from '@/domain/usecases'

const mockTodo = (): Todo => ({
  id: faker.datatype.uuid(),
  workspaceId: faker.random.numeric(6),
  text: faker.random.words(3),
  done: false,
  currentDate: new Date()
})

export class AddTodoSpy implements AddTodo {
  params: AddTodo.Params
  result = mockTodo()

  async add (params: AddTodo.Params): Promise<AddTodo.Result> {
    this.params = params
    return this.result
  }
}

export class DeleteTodoSpy implements DeleteTodo {
  todo: DeleteTodo.Params

  async delete (todo: DeleteTodo.Params): Promise<void> {
    this.todo = todo
  }
}

export class DeleteDoneTodosSpy implements DeleteDoneTodos {
  result = null

  async delete (): Promise<void> {
    return this.result
  }
}

export class UpdateTodoSpy implements UpdateTodo {
  todo: UpdateTodo.Params
  result = mockTodo()

  async update (todo: UpdateTodo.Params): Promise<UpdateTodo.Result> {
    this.todo = todo
    return this.result
  }
}

export class LoadTodosSpy implements LoadTodos {
  result = [mockTodo()]

  async loadAll (): Promise<LoadTodos.Result> {
    return this.result
  }
}

export class LoadTodoSpy implements LoadTodo {
  result = mockTodo()

  async load (): Promise<LoadTodo.Result> {
    return this.result
  }
}
