export type TodoId = string
export type TodoCurrentDate = Date
export type TodoText = string
export type TodoWorkspacesId = number
export type TodoDone = boolean

export interface Todo {
  currentDate: TodoCurrentDate
  done: TodoDone
  id: TodoId
  text: TodoText
  workspacesId: TodoWorkspacesId
}
