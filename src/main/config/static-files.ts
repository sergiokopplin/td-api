import express, { type Express } from 'express'
import { resolve } from 'path'

export const staticConfig = (app: Express): void => {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
}
