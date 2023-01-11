import { faker } from '@faker-js/faker'

import { Todo } from '@/domain/models'
import { AddTodo, DeleteTodo, UpdateTodo, LoadTodo } from '@/domain/usecases'

const mockTodo: Todo = {
  text: faker.random.words(3),
  completed: false,
  id: faker.datatype.uuid(),
  currentDate: new Date('2021-03-17T23:18:04.822Z'),
  workspaceId: faker.datatype.uuid()
}

const { text, completed, id, currentDate, workspaceId } = mockTodo

export const mockAddTodoParams = (): AddTodo.Params => ({
  text,
  currentDate,
  workspaceId
})
export const mockDeleteTodoParams = (): DeleteTodo.Params => ({ id, workspaceId })
export const mockLoadTodoParams = (): LoadTodo.Param => ({ id, workspaceId })
export const mockUpdateTodoParams = (): UpdateTodo.Params => ({
  text,
  completed,
  id,
  currentDate,
  workspaceId
})
