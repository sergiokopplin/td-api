export type TodoId = string
export type TodoCurrentDate = Date
export type TodoText = string
export type TodoWorkspacesId = number

export interface Todo {
  currentDate: TodoCurrentDate
  done: boolean
  id: TodoId
  text: TodoText
  workspacesId: TodoWorkspacesId
}
