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
    await MongoHelper.createIndex()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return an todo on success', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await sut.add({
        text: todo.text,
        workspacesId: todo.workspacesId,
        currentDate: todo.currentDate
      })
      expect(result.todo.id).toBeTruthy()
      expect(result.todo.text).toBe(todo.text)
      expect(result.todo.done).toBe(false)
      expect(result.todo.workspacesId).toBe(todo.workspacesId)
    })

    test('Should return correctly with optional params', async () => {
      const sut = makeSut()
      const result = await sut.add({
        text: mockAddTodoParams().text,
        currentDate: new Date('2021-03-17T23:18:04.822Z'),
        workspacesId: mockAddTodoParams().workspacesId
      })
      expect(result.todo.id).toBeTruthy()
      expect(result.todo.currentDate).toEqual(new Date('2021-03-17T23:18:04.822Z'))
    })
  })

  describe('delete()', () => {
    test('Should return 0 on count', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await todosCollection.insertOne(todo)
      let count = await todosCollection.countDocuments()
      expect(count).toBe(1)
      await sut.delete(result.ops[0]._id, todo.workspacesId)
      count = await todosCollection.countDocuments()
      expect(count).toBe(0)
    })
  })

  describe('deleteDone()', () => {
    test('Should return 1 on count', async () => {
      const sut = makeSut()
      const workspacesId = faker.datatype.number(6)
      await todosCollection.insertMany([
        {
          ...mockAddTodoParams(),
          done: true
        },
        {
          ...mockAddTodoParams(),
          done: true,
          workspacesId
        },
        {
          ...mockAddTodoParams(),
          done: false
        },
        {
          ...mockAddTodoParams(),
          done: true,
          workspacesId
        },
        {
          ...mockAddTodoParams(),
          done: false,
          workspacesId
        }
      ])
      let count = await todosCollection.countDocuments()
      expect(count).toBe(5)
      await sut.deleteDone(workspacesId)
      count = await todosCollection.countDocuments()
      expect(count).toBe(3)
      const result = await todosCollection.find({ workspacesId }).toArray()
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
        workspacesId: mockAddTodoParams().workspacesId
      })
      expect(updateResult).toEqual({
        todo: {
          id: result.ops[0]._id,
          done: true,
          text: 'new text',
          currentDate: new Date('2021-03-17T23:18:04.822Z'),
          workspacesId: mockAddTodoParams().workspacesId
        }
      })
    })

    test('Should return empty when not existing todo to update', async () => {
      const sut = makeSut()
      const updateResult = await sut.update({
        id: '60480d9b39bab84bf07eac95',
        done: true,
        text: 'new text',
        currentDate: new Date('2021-03-17T23:18:04.822Z'),
        workspacesId: mockAddTodoParams().workspacesId
      })
      expect(updateResult).toEqual(null)
    })
  })

  describe('updateState()', () => {
    test('Should return an updated todo', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await todosCollection.insertOne(todo)
      const updateStateResult = await sut.updateState({
        id: result.ops[0]._id,
        done: true,
        workspacesId: mockAddTodoParams().workspacesId
      })

      expect(updateStateResult.todo.id).toBeTruthy()
      expect(updateStateResult.todo.text).toBe(todo.text)
      expect(updateStateResult.todo.done).toBe(true)
      expect(updateStateResult.todo.workspacesId).toBe(todo.workspacesId)
      expect(updateStateResult.todo.currentDate).toBeTruthy()
    })

    test('Should return empty when not existing todo to update', async () => {
      const sut = makeSut()
      const updateStateResult = await sut.updateState({
        id: '60480d9b39bab84bf07eac95',
        done: true,
        workspacesId: mockAddTodoParams().workspacesId
      })
      expect(updateStateResult).toEqual(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all todos', async () => {
      const sut = makeSut()
      const workspacesId = mockAddTodoParams().workspacesId
      await todosCollection.insertOne({
        text: 'first text',
        done: true,
        workspacesId
      })
      await todosCollection.insertOne({
        text: 'second text',
        done: false,
        workspacesId
      })
      await todosCollection.insertOne({
        text: 'second text',
        done: false
      })
      const loadAllResult = await sut.loadAll(mockAddTodoParams().workspacesId)
      const count = await todosCollection.countDocuments()
      expect(count).toBe(3)
      expect(loadAllResult.length).toBe(2)
      const result = await todosCollection.find({ workspacesId }).toArray()
      expect(result.length).toBe(2)
    })

    test('Should return empty todos', async () => {
      const sut = makeSut()
      await todosCollection.insertOne({
        text: 'second text',
        done: false
      })
      const loadAllResult = await sut.loadAll(mockAddTodoParams().workspacesId)
      const count = await todosCollection.countDocuments()
      expect(count).toBe(1)
      expect(loadAllResult.length).toBe(0)
    })
  })

  describe('load()', () => {
    test('Should return a todo', async () => {
      const sut = makeSut()
      const workspacesId = mockAddTodoParams().workspacesId
      const result = await todosCollection.insertOne({
        text: 'first text',
        done: true,
        workspacesId
      })
      const loadAllResult = await sut.load({ id: result.insertedId, workspacesId })
      expect(loadAllResult).toEqual({
        id: result.insertedId,
        text: 'first text',
        done: true,
        workspacesId
      })
    })

    test('Should return an empty todo when no results', async () => {
      const sut = makeSut()
      const workspacesId = mockAddTodoParams().workspacesId
      await todosCollection.insertOne({
        text: 'second text',
        done: false
      })
      const loadAllResult = await sut.load({
        id: '6048177f57568d02bfca0f0f',
        workspacesId
      })
      expect(loadAllResult).toEqual(null)
    })
  })

  describe('search()', () => {
    test('Should return all todos', async () => {
      const sut = makeSut()
      const workspacesId = mockAddTodoParams().workspacesId
      await todosCollection.insertOne({
        text: 'first',
        done: true,
        workspacesId
      })
      await todosCollection.insertOne({
        text: 'second text',
        done: false,
        workspacesId
      })
      await todosCollection.insertOne({
        text: 'third text',
        done: false,
        workspacesId
      })
      await todosCollection.insertOne({
        text: 'text',
        done: false,
        workspacesId: 987654
      })
      const searchResult = await sut.search({ q: 'text', workspacesId })
      const count = await todosCollection.countDocuments()
      expect(count).toBe(4)
      expect(searchResult.todos.length).toBe(2)
      const result = await todosCollection.find({ workspacesId }).toArray()
      expect(result.length).toBe(3)
    })

    test('Should return empty todos', async () => {
      const sut = makeSut()
      const workspacesId = mockAddTodoParams().workspacesId
      await todosCollection.insertOne({
        text: 'second text',
        done: false,
        workspacesId
      })
      const searchResult = await sut.search({ q: 'spec', workspacesId })
      const count = await todosCollection.countDocuments()
      expect(count).toBe(1)
      expect(searchResult.todos.length).toBe(0)
    })
  })
})
