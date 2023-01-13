import { faker } from '@faker-js/faker'

import { Todo } from '@/domain/models'
import {
  AddTodo,
  DeleteTodo,
  DeleteDoneTodos,
  UpdateTodo,
  LoadTodos,
  LoadTodo,
  UpdateTodoState,
  SearchTodos
} from '@/domain/usecases'

const mockTodo = (): Todo => ({
  id: faker.datatype.uuid(),
  workspacesId: faker.datatype.number(6),
  text: faker.random.words(3),
  done: false,
  currentDate: new Date()
})

export class AddTodoSpy implements AddTodo {
  params: AddTodo.Params
  result = { todo: mockTodo() }

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
  result = { todo: mockTodo() }

  async update (todo: UpdateTodo.Params): Promise<UpdateTodo.Result> {
    this.todo = todo
    return this.result
  }
}

export class UpdateTodoStateSpy implements UpdateTodoState {
  params: UpdateTodoState.Params
  result = { todo: mockTodo() }

  async updateState (params: UpdateTodoState.Params): Promise<UpdateTodoState.Result> {
    this.params = params
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

export class SearchTodosSpy implements SearchTodos {
  params: SearchTodos.Params
  result = { todos: [mockTodo()] }

  async search (params: SearchTodos.Params): Promise<SearchTodos.Result> {
    this.params = params
    return this.result
  }
}
