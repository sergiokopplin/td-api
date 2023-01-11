export interface DeleteDoneTodos {
  delete: (workspacesId: number) => Promise<void>
}
