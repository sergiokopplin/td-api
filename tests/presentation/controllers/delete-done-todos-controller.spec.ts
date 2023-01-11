import { faker } from '@faker-js/faker'

import { DeleteDoneTodosController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { noResult, serverError } from '@/presentation/helpers'
import { DeleteDoneTodosSpy } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DeleteDoneTodosController
  deleteDoneTodosSpy: DeleteDoneTodosSpy
}

const makeSut = (): SutTypes => {
  const deleteDoneTodosSpy = new DeleteDoneTodosSpy()
  const sut = new DeleteDoneTodosController(deleteDoneTodosSpy)

  return {
    sut,
    deleteDoneTodosSpy
  }
}

const mockRequest = (): DeleteDoneTodosController.Request => {
  return {
    workspaceId: faker.datatype.uuid()
  }
}

describe('DeleteDoneTodos Controller', () => {
  test('Should throw if DeleteDoneTodos throws', async () => {
    const { sut, deleteDoneTodosSpy } = makeSut()
    jest.spyOn(deleteDoneTodosSpy, 'delete').mockImplementationOnce(async () => {
      await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call DeleteTodo with correct params', async () => {
    const { sut, deleteDoneTodosSpy } = makeSut()
    const deleteSpy = jest.spyOn(deleteDoneTodosSpy, 'delete')
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteSpy).toHaveBeenCalledWith(request.workspaceId)
  })

  test('Should return 204 when ok', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noResult())
  })
})
