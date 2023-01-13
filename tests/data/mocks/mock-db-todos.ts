import { faker } from '@faker-js/faker'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  LoadTodosRepository,
  UpdateTodoRepository,
  LoadTodoRepository,
  UpdateTodoStateRepository,
  SearchTodosRepository
} from '@/data/protocols'
import { Todo, TodoCurrentDate, TodoText, TodoId } from '@/domain/models'

const mockTodo: Todo = {
  id: faker.datatype.uuid(),
  workspacesId: faker.datatype.number(6),
  text: faker.random.words(3),
  done: false,
  currentDate: new Date()
}

export class AddTodoRepositorySpy implements AddTodoRepository {
  currentDate: TodoCurrentDate
  text: TodoText
  result = { todo: mockTodo }

  async add ({
    currentDate,
    text
  }: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    this.currentDate = currentDate
    this.text = text
    return this.result
  }
}

export class DeleteTodoRepositorySpy implements DeleteTodoRepository {
  id: TodoId

  async delete (id: TodoId): Promise<void> {
    this.id = id
  }

  async deleteDone (): Promise<void> {
    return null
  }
}

export class UpdateTodoRepositorySpy implements UpdateTodoRepository {
  params = {
    id: faker.datatype.uuid(),
    text: faker.random.words(3),
    done: false
  }

  result = { todo: mockTodo }

  async update (params: UpdateTodoRepository.Params): Promise<UpdateTodoRepository.Result> {
    this.params = params
    return this.result
  }
}

export class UpdateTodoStateRepositorySpy implements UpdateTodoStateRepository {
  params = {
    id: faker.datatype.uuid(),
    workspacesId: faker.datatype.number(6),
    done: false
  }

  result = { todo: mockTodo }

  async updateState (params: UpdateTodoStateRepository.Params): Promise<UpdateTodoStateRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadTodosRepositorySpy implements LoadTodosRepository {
  result = [mockTodo]

  async loadAll (): Promise<LoadTodosRepository.Result[]> {
    return this.result
  }
}

export class LoadTodoRepositorySpy implements LoadTodoRepository {
  id = faker.datatype.uuid()
  result = mockTodo

  async load (todo: LoadTodoRepository.Params): Promise<LoadTodoRepository.Result> {
    this.id = todo.id
    return this.result
  }
}

export class SearchTodosRepositorySpy implements SearchTodosRepository {
  result = { todos: [mockTodo] }
  params = {
    q: faker.datatype.string(10),
    workspacesId: faker.datatype.number(6)
  }

  async search (params: SearchTodosRepository.Params): Promise<SearchTodosRepository.Result> {
    this.params = params
    return this.result
  }
}
