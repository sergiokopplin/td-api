import { ObjectIdValidatorAdapter } from '@/infra/validators'
import { makeUpdateTodoStateValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  ObjectIdValidator
} from '@/validation/validators'

describe('UpdateTodoStateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeUpdateTodoStateValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('id'),
        new ObjectIdValidator('id', new ObjectIdValidatorAdapter()),
        new RequiredFieldValidator('workspacesId'),
        new RequiredFieldValidator('done')
      ])
    )
  })
})
