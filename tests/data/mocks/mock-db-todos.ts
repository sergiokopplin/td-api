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
  workspacesId: faker.datatype.number(6),
  text: faker.random.words(3),
  done: false,
  currentDate: new Date()
}

export class AddTodoRepositorySpy implements AddTodoRepository {
  currentDate: Date
  text: string
  result = mockTodo

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
  id: string

  async delete (id: string): Promise<void> {
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
