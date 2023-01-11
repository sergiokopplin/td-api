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
    done: {
      type: 'boolean'
    }
  },
  required: ['id', 'done', 'text']
}
