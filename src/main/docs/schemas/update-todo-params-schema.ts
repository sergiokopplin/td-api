export const updateTodoParamsSchema = {
  type: 'object',
  properties: {
    text: {
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
  required: ['id', 'completed', 'text']
}
