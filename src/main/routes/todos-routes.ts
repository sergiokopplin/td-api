import { Router } from 'express'

import { expressRouteAdapt } from '@/main/adapters'
import {
  makeAddTodoController,
  makeDeleteTodoController,
  makeDeleteDoneTodosController,
  makeUpdateTodoController,
  makeLoadTodosController,
  makeLoadTodoController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

export const todosRoutes = (router: Router): void => {
  // v2
  router.post('/workspaces/:workspacesId/todos', auth, expressRouteAdapt(makeAddTodoController()))
  router.put('/workspaces/:workspacesId/todos', auth, expressRouteAdapt(makeUpdateTodoController()))

  // v1
  router.delete('/todos/:id', auth, expressRouteAdapt(makeDeleteTodoController()))
  router.delete('/todos-done', auth, expressRouteAdapt(makeDeleteDoneTodosController()))
  router.get('/todos', auth, expressRouteAdapt(makeLoadTodosController()))
  router.get('/todos/:id', auth, expressRouteAdapt(makeLoadTodoController()))
}
