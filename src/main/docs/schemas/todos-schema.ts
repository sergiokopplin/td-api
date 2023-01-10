export const todosSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      dueDate: {
        type: 'string'
      },
      completed: {
        type: 'boolean'
      }
    },
    required: ['id', 'title', 'completed']
  }
}
