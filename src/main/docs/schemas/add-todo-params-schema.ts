export const addTodoParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    currentDate: {
      type: 'string'
    }
  },
  required: ['title']
}
