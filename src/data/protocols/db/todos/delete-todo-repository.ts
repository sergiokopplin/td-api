export interface DeleteTodoRepository {
  delete: (id: string, workspacesId: number) => Promise<void>
  deleteDone: (workspacesId: number) => Promise<void>
}
