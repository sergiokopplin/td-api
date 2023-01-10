import { faker } from '@faker-js/faker'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  LoadTodosRepository,
  UpdateTodoRepository,
  LoadTodoRepository
} from '@/data/protocols'
import { Todo } from '@/domain/models'

const mockTodo: Todo = {
  id: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  title: faker.random.words(3),
  completed: false,
  currentDate: new Date()
}

export class AddTodoRepositorySpy implements AddTodoRepository {
  currentDate: Date
  title: string
  result = mockTodo

  async add ({
    currentDate,
    title
  }: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    this.currentDate = currentDate
    this.title = title
    return this.result
  }
}

export class DeleteTodoRepositorySpy implements DeleteTodoRepository {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }

  async deleteCompleted (): Promise<void> {
    return null
  }
}

export class UpdateTodoRepositorySpy implements UpdateTodoRepository {
  params = {
    id: faker.datatype.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  result = mockTodo

  async update (params: UpdateTodoRepository.Params): Promise<UpdateTodoRepository.Result> {
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

  async load (todo: LoadTodoRepository.Param): Promise<LoadTodoRepository.Result> {
    this.id = todo.id
    return this.result
  }
}
