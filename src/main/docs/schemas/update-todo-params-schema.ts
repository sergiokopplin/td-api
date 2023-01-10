export const updateTodoParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    currentDate: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    completed: {
      type: 'boolean'
    }
  },
  required: ['id', 'completed', 'title']
}
