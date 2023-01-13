import { faker } from '@faker-js/faker'

import { Todo } from '@/domain/models'
import { AddTodo, DeleteTodo, UpdateTodo, LoadTodo, UpdateTodoState } from '@/domain/usecases'

const mockTodo: Todo = {
  text: faker.random.words(3),
  done: false,
  id: faker.datatype.uuid(),
  currentDate: new Date('2021-03-17T23:18:04.822Z'),
  workspacesId: faker.datatype.number(6)
}

const { text, done, id, currentDate, workspacesId } = mockTodo

export const mockAddTodoParams = (): AddTodo.Params => ({
  text,
  currentDate,
  workspacesId
})
export const mockDeleteTodoParams = (): DeleteTodo.Params => ({ id, workspacesId })
export const mockLoadTodoParams = (): LoadTodo.Params => ({ id, workspacesId })
export const mockUpdateTodoParams = (): UpdateTodo.Params => ({
  text,
  done,
  id,
  currentDate,
  workspacesId
})
export const mockUpdateTodoStateParams = (): UpdateTodoState.Params => ({
  done,
  id,
  workspacesId
})
