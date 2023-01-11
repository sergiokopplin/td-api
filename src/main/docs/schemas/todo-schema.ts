export const todoSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    text: {
      type: 'string'
    },
    currentDate: {
      type: 'string'
    },
    completed: {
      type: 'boolean'
    }
  },
  required: ['id', 'text', 'completed']
}
