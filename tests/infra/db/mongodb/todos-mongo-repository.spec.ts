import { faker } from '@faker-js/faker'
import { Collection } from 'mongodb'

import { MongoHelper, TodosMongoRepository } from '@/infra/db'
import { mockAddTodoParams } from '@/tests/domain/mocks'

const makeSut = (): TodosMongoRepository => {
  return new TodosMongoRepository()
}

let todosCollection: Collection

describe('TodosMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    todosCollection = await MongoHelper.getCollection('todos')
    await todosCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return an todo on success', async () => {
      const sut = makeSut()
      const result = await sut.add({
        text: mockAddTodoParams().text,
        workspaceId: mockAddTodoParams().workspaceId,
        currentDate: new Date('2021-03-17T23:18:04.822Z')
      })
      expect(result.id).toBeTruthy()
      expect(result.text).toBe(mockAddTodoParams().text)
      expect(result.done).toBe(false)
      expect(result.workspaceId).toBe(mockAddTodoParams().workspaceId)
    })

    test('Should return correctly with optional params', async () => {
      const sut = makeSut()
      const result = await sut.add({
        text: mockAddTodoParams().text,
        currentDate: new Date('2021-03-17T23:18:04.822Z'),
        workspaceId: mockAddTodoParams().workspaceId
      })
      expect(result.id).toBeTruthy()
      expect(result.currentDate).toEqual(new Date('2021-03-17T23:18:04.822Z'))
    })
  })

  describe('delete()', () => {
    test('Should return 0 on count', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await todosCollection.insertOne(todo)
      let count = await todosCollection.countDocuments()
      expect(count).toBe(1)
      await sut.delete(result.ops[0]._id, todo.workspaceId)
      count = await todosCollection.countDocuments()
      expect(count).toBe(0)
    })
  })

  describe('deleteDone()', () => {
    test('Should return 1 on count', async () => {
      const sut = makeSut()
      const workspaceId = faker.datatype.uuid()
      await todosCollection.insertMany([
        {
          ...mockAddTodoParams(),
          done: true
        },
        {
          ...mockAddTodoParams(),
          done: true,
          workspaceId
        },
        {
          ...mockAddTodoParams(),
          done: false
        },
        {
          ...mockAddTodoParams(),
          done: true,
          workspaceId
        },
        {
          ...mockAddTodoParams(),
          done: false,
          workspaceId
        }
      ])
      let count = await todosCollection.countDocuments()
      expect(count).toBe(5)
      await sut.deleteDone(workspaceId)
      count = await todosCollection.countDocuments()
      expect(count).toBe(3)
      const result = await todosCollection.find({ workspaceId }).toArray()
      expect(result.length).toBe(1)
    })
  })

  describe('update()', () => {
    test('Should return an updated todo', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await todosCollection.insertOne(todo)
      const updateResult = await sut.update({
        id: result.ops[0]._id,
        done: true,
        text: 'new text',
        currentDate: new Date('2021-03-17T23:18:04.822Z'),
        workspaceId: mockAddTodoParams().workspaceId
      })
      expect(updateResult).toEqual({
        id: result.ops[0]._id,
        done: true,
        text: 'new text',
        currentDate: new Date('2021-03-17T23:18:04.822Z'),
        workspaceId: mockAddTodoParams().workspaceId
      })
    })

    test('Should return empty when not existing todo to update', async () => {
      const sut = makeSut()
      const updateResult = await sut.update({
        id: '60480d9b39bab84bf07eac95',
        done: true,
        text: 'new text',
        currentDate: new Date('2021-03-17T23:18:04.822Z'),
        workspaceId: mockAddTodoParams().workspaceId
      })
      expect(updateResult).toEqual(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all todos', async () => {
      const sut = makeSut()
      const workspaceId = mockAddTodoParams().workspaceId
      await todosCollection.insertOne({
        text: 'first text',
        done: true,
        workspaceId
      })
      await todosCollection.insertOne({
        text: 'second text',
        done: false,
        workspaceId
      })
      await todosCollection.insertOne({
        text: 'second text',
        done: false
      })
      const loadAllResult = await sut.loadAll(mockAddTodoParams().workspaceId)
      const count = await todosCollection.countDocuments()
      expect(count).toBe(3)
      expect(loadAllResult.length).toBe(2)
      const result = await todosCollection.find({ workspaceId }).toArray()
      expect(result.length).toBe(2)
    })

    test('Should return empty todos', async () => {
      const sut = makeSut()
      await todosCollection.insertOne({
        text: 'second text',
        done: false
      })
      const loadAllResult = await sut.loadAll(mockAddTodoParams().workspaceId)
      const count = await todosCollection.countDocuments()
      expect(count).toBe(1)
      expect(loadAllResult.length).toBe(0)
    })
  })

  describe('load()', () => {
    test('Should return a todo', async () => {
      const sut = makeSut()
      const workspaceId = mockAddTodoParams().workspaceId
      const result = await todosCollection.insertOne({
        text: 'first text',
        done: true,
        workspaceId
      })
      const loadAllResult = await sut.load({ id: result.insertedId, workspaceId })
      expect(loadAllResult).toEqual({
        id: result.insertedId,
        text: 'first text',
        done: true,
        workspaceId
      })
    })

    test('Should return an empty todo when no results', async () => {
      const sut = makeSut()
      const workspaceId = mockAddTodoParams().workspaceId
      await todosCollection.insertOne({
        text: 'second text',
        done: false
      })
      const loadAllResult = await sut.load({
        id: '6048177f57568d02bfca0f0f',
        workspaceId
      })
      expect(loadAllResult).toEqual(null)
    })
  })
})
