export interface DeleteCompletedTodos {
  delete: (workspaceId: string) => Promise<void>
}
