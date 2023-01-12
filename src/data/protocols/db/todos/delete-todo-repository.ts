import { TodoId, TodoWorkspacesId } from '@/domain/models'

export interface DeleteTodoRepository {
  delete: (id: TodoId, workspacesId: TodoWorkspacesId) => Promise<void>
  deleteDone: (workspacesId: TodoWorkspacesId) => Promise<void>
}
