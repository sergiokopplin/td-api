import { DateValidatorAdapter, ObjectIdValidatorAdapter } from '@/infra/validators'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeUpdateTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('id').required().objectId(new ObjectIdValidatorAdapter()).build(),
    ...ValidationBuilder.field('text').required().min(3).build(),
    ...ValidationBuilder.field('done').required().build(),
    ...ValidationBuilder.field('currentDate').required().date(new DateValidatorAdapter()).build()
  ])
