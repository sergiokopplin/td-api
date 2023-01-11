export interface DeleteDoneTodos {
  delete: (workspaceId: string) => Promise<void>
}
