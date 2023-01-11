import { DateValidatorAdapter } from '@/infra/validators'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeAddTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('workspacesId').required().build(),
    ...ValidationBuilder.field('text').required().min(3).build(),
    ...ValidationBuilder.field('currentDate').date(new DateValidatorAdapter()).build()
  ])
