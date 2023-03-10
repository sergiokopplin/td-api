import { type TodoWorkspacesId } from '@/domain/models'

export interface DeleteDoneTodos {
  delete: (workspacesId: TodoWorkspacesId) => Promise<void>
}
