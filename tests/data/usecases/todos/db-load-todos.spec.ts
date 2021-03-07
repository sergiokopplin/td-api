import { DbLoadTodos } from '@/data/usecases'
import { LoadTodosRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbLoadTodos
  loadTodosRepositorySpy: LoadTodosRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadTodosRepositorySpy = new LoadTodosRepositorySpy()
  const sut = new DbLoadTodos(loadTodosRepositorySpy)

  return {
    sut,
    loadTodosRepositorySpy
  }
}

describe('DbLoadTodos', () => {
  test('Should throw if LoadTodosRepositorySpy throws', async () => {
    const { sut, loadTodosRepositorySpy } = makeSut()
    jest
      .spyOn(loadTodosRepositorySpy, 'loadAll')
      .mockImplementationOnce(throwError)
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should return an todo list if it succeeds', async () => {
    const { sut, loadTodosRepositorySpy } = makeSut()
    const response = await sut.loadAll()
    expect(response).toBe(loadTodosRepositorySpy.result)
  })
})
