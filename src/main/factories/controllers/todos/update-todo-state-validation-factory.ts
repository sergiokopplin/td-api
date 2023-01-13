import { ObjectIdValidatorAdapter } from '@/infra/validators'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeUpdateTodoStateValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('id').required().objectId(new ObjectIdValidatorAdapter()).build(),
    ...ValidationBuilder.field('workspacesId').required().build(),
    ...ValidationBuilder.field('done').required().build()
  ])
