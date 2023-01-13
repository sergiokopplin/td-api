import { DbUpdateTodoState } from '@/data/usecases'
import { UpdateTodoStateRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateTodoParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbUpdateTodoState
  updateTodoStateRepositorySpy: UpdateTodoStateRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateTodoStateRepositorySpy = new UpdateTodoStateRepositorySpy()
  const sut = new DbUpdateTodoState(updateTodoStateRepositorySpy)

  return {
    sut,
    updateTodoStateRepositorySpy
  }
}

describe('DbUpdateTodoState', () => {
  test('Should throw if UpdateTodoStateRepositorySpy throws', async () => {
    const { sut, updateTodoStateRepositorySpy } = makeSut()
    jest.spyOn(updateTodoStateRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateTodoParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateTodoStateRepositorySpy with correct params', async () => {
    const { sut, updateTodoStateRepositorySpy } = makeSut()
    const updateAccountParams = mockUpdateTodoParams()
    await sut.update(updateAccountParams)
    expect(updateTodoStateRepositorySpy.params).toBe(updateAccountParams)
  })

  test('Should return an todo if it succeeds', async () => {
    const { sut, updateTodoStateRepositorySpy } = makeSut()
    const updateAccountParams = mockUpdateTodoParams()
    const response = await sut.update(updateAccountParams)
    expect(response).toBe(updateTodoStateRepositorySpy.result)
  })
})
