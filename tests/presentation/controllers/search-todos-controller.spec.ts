import { faker } from '@faker-js/faker'

import { SearchTodosController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers'
import { SearchTodosSpy } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: SearchTodosController
  searchTodosSpy: SearchTodosSpy
}

const makeSut = (): SutTypes => {
  const searchTodosSpy = new SearchTodosSpy()
  const sut = new SearchTodosController(searchTodosSpy)

  return {
    sut,
    searchTodosSpy
  }
}

const mockRequest = (): SearchTodosController.Request => {
  return {
    q: faker.datatype.string(10),
    workspacesId: faker.datatype.number(6)
  }
}

describe('Search Todos Controller', () => {
  test('Should throw if Search throws', async () => {
    const { sut, searchTodosSpy } = makeSut()
    jest.spyOn(searchTodosSpy, 'search').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call Search with correct params', async () => {
    const { sut, searchTodosSpy } = makeSut()
    const request = mockRequest()
    const searchSpy = jest.spyOn(searchTodosSpy, 'search')
    await sut.handle(request)
    expect(searchSpy).toHaveBeenLastCalledWith({
      q: request.q,
      workspacesId: request.workspacesId
    })
  })

  test('Should return 200 if ok', async () => {
    const { sut, searchTodosSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(searchTodosSpy.result))
  })
})
