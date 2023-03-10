import { type Request, type Response } from 'express'

import { type Controller } from '@/presentation/protocols'

export const expressRouteAdapt = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      accountId: req?.accountId,
      workspacesId: req?.params?.workspacesId && parseInt(req?.params?.workspacesId, 10)
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
