export const todosSchema = {
  type: 'array',
  items: {
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
      done: {
        type: 'boolean'
      }
    },
    required: ['id', 'text', 'done']
  }
}
