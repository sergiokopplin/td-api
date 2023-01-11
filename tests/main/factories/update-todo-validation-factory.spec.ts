import { DateValidatorAdapter, ObjectIdValidatorAdapter } from '@/infra/validators'
import { makeUpdateTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  ObjectIdValidator,
  MinLengthValidator,
  DateValidator
} from '@/validation/validators'

describe('UpdateTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeUpdateTodoValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('id'),
        new ObjectIdValidator('id', new ObjectIdValidatorAdapter()),
        new RequiredFieldValidator('text'),
        new MinLengthValidator('text', 3),
        new RequiredFieldValidator('done'),
        new DateValidator('currentDate', new DateValidatorAdapter())
      ])
    )
  })
})
