import {
  addTodoPath,
  loadTodoPath,
  loadTodosPath,
  updateTodoPath,
  deleteTodoPath,
  deleteDoneTodosPath
} from './todos'

export const todosPath = {
  '/todos': {
    ...addTodoPath,
    ...loadTodosPath,
    ...updateTodoPath
  },
  '/todos/{id}': {
    ...loadTodoPath,
    ...deleteTodoPath
  },
  '/todos-done': {
    ...deleteDoneTodosPath
  }
}
