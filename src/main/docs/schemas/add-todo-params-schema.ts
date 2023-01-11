export const addTodoParamsSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string'
    },
    currentDate: {
      type: 'string'
    }
  },
  required: ['text']
}
