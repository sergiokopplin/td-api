import { Router } from 'express'

import { expressRouteAdapt } from '@/main/adapters'
import {
  makeAddTodoController,
  makeDeleteTodoController,
  makeDeleteDoneTodosController,
  makeUpdateTodoController,
  makeUpdateTodoStateController,
  makeLoadTodosController,
  makeLoadTodoController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

export const todosRoutes = (router: Router): void => {
  router.post('/workspaces/:workspacesId/todos', auth, expressRouteAdapt(makeAddTodoController()))

  // TODO: gets id from url
  router.patch('/workspaces/:workspacesId/todos', auth, expressRouteAdapt(makeUpdateTodoController()))
  router.post('/workspaces/:workspacesId/todos/:id/state', auth, expressRouteAdapt(makeUpdateTodoStateController()))

  router.get('/workspaces/:workspacesId/todos', auth, expressRouteAdapt(makeLoadTodosController()))
  router.get('/workspaces/:workspacesId/todos/:id', auth, expressRouteAdapt(makeLoadTodoController()))
  router.delete('/workspaces/:workspacesId/todos/:id', auth, expressRouteAdapt(makeDeleteTodoController()))
  router.delete('/workspaces/:workspacesId/todos-done', auth, expressRouteAdapt(makeDeleteDoneTodosController()))
}
