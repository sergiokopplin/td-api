export interface DeleteTodoRepository {
  delete: (id: string, workspaceId: string) => Promise<void>
  deleteDone: (workspaceId: string) => Promise<void>
}
