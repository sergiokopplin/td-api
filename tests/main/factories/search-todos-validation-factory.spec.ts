import { makeSearchTodosValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator
} from '@/validation/validators'

describe('SearchTodosValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeSearchTodosValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('q'),
        new RequiredFieldValidator('workspacesId')
      ])
    )
  })
})
