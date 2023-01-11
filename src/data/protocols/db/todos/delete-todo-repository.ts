export interface DeleteTodoRepository {
  delete: (id: string, workspaceId: string) => Promise<void>
  deleteCompleted: (workspaceId: string) => Promise<void>
}
