import { faker } from '@faker-js/faker'

import { UpdateTodoStateController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequestError, notFoundError, ok, serverError } from '@/presentation/helpers'
import { ValidationSpy, UpdateTodoStateSpy } from '@/tests/presentation/mocks'

const mockRequest = (): UpdateTodoStateController.Request => {
  return {
    id: faker.datatype.uuid(),
    workspacesId: faker.datatype.number(6),
    done: true
  }
}

interface SutTypes {
  sut: UpdateTodoStateController
  validationSpy: ValidationSpy
  updateTodoStateSpy: UpdateTodoStateSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateTodoStateSpy = new UpdateTodoStateSpy()
  const sut = new UpdateTodoStateController(validationSpy, updateTodoStateSpy)

  return {
    sut,
    validationSpy,
    updateTodoStateSpy
  }
}

describe('Update Todo State Controller', () => {
  test('Should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new InvalidParamError('text')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequestError(validationSpy.error))
  })

  test('Should call Validation correctly', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequestError(validationSpy.error))
  })

  test('Should throw if UpdateTodo throws', async () => {
    const { sut, updateTodoStateSpy } = makeSut()
    jest.spyOn(updateTodoStateSpy, 'updateState').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UpdateTodo with correct params', async () => {
    const { sut, updateTodoStateSpy } = makeSut()
    const addSpy = jest.spyOn(updateTodoStateSpy, 'updateState')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 404 if no existing todo', async () => {
    const { sut, updateTodoStateSpy } = makeSut()
    updateTodoStateSpy.result = null
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(notFoundError())
  })

  test('Should return 200 if ok', async () => {
    const { sut, updateTodoStateSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(updateTodoStateSpy.result))
  })
})
