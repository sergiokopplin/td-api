export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/todo-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
