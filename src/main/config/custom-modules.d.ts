declare module Express {
  interface Request {
    accountId?: string
    workspacesId?: string
  }
}
