import { faker } from '@faker-js/faker'

import { DbSearchTodos } from '@/data/usecases'
import { SearchTodosRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbSearchTodos
  searchTodosRepositorySpy: SearchTodosRepositorySpy
}

const makeSut = (): SutTypes => {
  const searchTodosRepositorySpy = new SearchTodosRepositorySpy()
  const sut = new DbSearchTodos(searchTodosRepositorySpy)

  return {
    sut,
    searchTodosRepositorySpy
  }
}

const mockRequest = (): DbSearchTodos.Params => {
  return {
    q: faker.datatype.string(10),
    workspacesId: faker.datatype.number(6)
  }
}

describe('DbSearchTodos', () => {
  test('Should throw if SearchTodosRepository throws', async () => {
    const { sut, searchTodosRepositorySpy } = makeSut()
    jest.spyOn(searchTodosRepositorySpy, 'search').mockImplementationOnce(throwError)
    const promise = sut.search(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an todo list if it succeeds', async () => {
    const { sut, searchTodosRepositorySpy } = makeSut()
    const response = await sut.search(mockRequest())
    expect(response).toBe(searchTodosRepositorySpy.result)
  })
})
