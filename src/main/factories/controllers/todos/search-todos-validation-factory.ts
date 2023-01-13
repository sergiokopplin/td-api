import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeSearchTodosValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('q').required().build(),
    ...ValidationBuilder.field('workspacesId').required().build()
  ])
