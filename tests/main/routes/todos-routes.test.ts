import { faker } from '@faker-js/faker'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import { env } from '@/main/config/env'
import { mockAddTodoParams } from '@/tests/domain/mocks'

let todosCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Sergio',
    email: 'sergio@gmail.com',
    password: '123asdqwe!@#'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {

      _id: id
    },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

describe('Todos Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    todosCollection = await MongoHelper.getCollection('todos')
    await todosCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    await MongoHelper.createIndex()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Todos', () => {
    describe('add', () => {
      test('Should return 403 without accessToken', async () => {
        const response = await request(app)
          .post('/api/workspaces/123456/todos')
          .send({
            text: faker.random.words(3),
            currentDate: new Date()
          })
          .expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 201 on add', async () => {
        const accessToken = await mockAccessToken()
        const text = faker.random.words(3)
        const currentDate = new Date()
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .post(`/api/workspaces/${workspacesId}/todos`)
          .set('x-access-token', accessToken)
          .send({
            text,
            currentDate
          })
          .expect(201)

        expect(response.body.todo.currentDate).toBe(currentDate.toISOString())
        expect(response.body.todo.done).toBe(false)
        expect(response.body.todo.id).toBeTruthy()
        expect(response.body.todo.text).toBe(text)
        expect(response.body.todo.workspacesId).toBe(workspacesId)
      })
    })

    describe('delete', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app).delete(`/api/workspaces/${todo.workspacesId}/todos/${result.insertedId}`).send().expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 204 on delete', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app)
          .delete(`/api/workspaces/${todo.workspacesId}/todos/${result.insertedId}`)
          .set('x-access-token', accessToken)
          .send()
          .expect(204)

        expect(response.body).toEqual({})
      })
    })

    describe('delete done', () => {
      test('Should return 403 without accessToken', async () => {
        const response = await request(app).delete('/api/workspaces/123456/todos-done').send().expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 204 on delete', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        await todosCollection.insertOne(todo)

        const response = await request(app)
          .delete(`/api/workspaces/${todo.workspacesId}/todos-done`)
          .set('x-access-token', accessToken)
          .send()
          .expect(204)

        expect(response.body).toEqual({})
      })
    })

    describe('update', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .patch(`/api/workspaces/${workspacesId}/todos/${result.ops[0]._id}`)
          .send({
            done: true,
            text: 'new text'
          })
          .expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on update', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .patch(`/api/workspaces/${workspacesId}/todos/${result.ops[0]._id}`)
          .set('x-access-token', accessToken)
          .send({
            done: true,
            text: 'new text',
            currentDate: new Date()
          })
          .expect(200)

        expect(response.body.todo.done).toBe(true)
        expect(response.body.todo.text).toBe('new text')
        expect(response.body.todo.id).toBeTruthy()
        expect(response.body.todo.currentDate).toBeTruthy()
        expect(response.body.todo.workspacesId).toBeTruthy()
      })

      test('Should return 404 when not exixting todo', async () => {
        const accessToken = await mockAccessToken()
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .patch(`/api/workspaces/${workspacesId}/todos/60480d9b39bab84bf07eac95`)
          .set('x-access-token', accessToken)
          .send({
            done: true,
            text: 'new text',
            currentDate: new Date()
          })
          .expect(404)

        expect(response.body).toEqual({
          error: 'Not Found'
        })
      })
    })

    describe('updateState', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .post(`/api/workspaces/${workspacesId}/todos/${result.ops[0]._id}/state`)
          .send({ done: true })
          .expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on update', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app)
          .post(`/api/workspaces/${todo.workspacesId}/todos/${result.ops[0]._id}/state`)
          .set('x-access-token', accessToken)
          .send({ done: true })
          .expect(200)

        expect(response.body.todo.done).toBe(true)
        expect(response.body.todo.text).toBeTruthy()
        expect(response.body.todo.id).toBeTruthy()
        expect(response.body.todo.currentDate).toBeTruthy()
        expect(response.body.todo.workspacesId).toBe(todo.workspacesId)
      })

      test('Should return 404 when not exixting todo', async () => {
        const accessToken = await mockAccessToken()
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .post(`/api/workspaces/${workspacesId}/todos/63c192dc7329713a46b464fe/state`)
          .set('x-access-token', accessToken)
          .send({ done: true })
          .expect(404)

        expect(response.body).toEqual({
          error: 'Not Found'
        })
      })
    })

    describe('loadAll', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const workspacesId = faker.random.numeric(6)

        await todosCollection.insertOne(todo)
        const response = await request(app)
          .get(`/api/workspaces/${workspacesId}/todos`)
          .send()
          .expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on loadAll', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()

        await todosCollection.insertMany([
          { ...todo },
          { ...todo, text: 'text' },
          { ...todo, workspacesId: todo.workspacesId + 1 }
        ])
        const response = await request(app).get(`/api/workspaces/${todo.workspacesId}/todos`).set('x-access-token', accessToken).send().expect(200)

        expect(response.body.length).toBe(2)
        expect(response.body[0].text).toEqual(todo.text)
        expect(response.body[1].text).toEqual('text')
      })
    })

    describe('load', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .get(`/api/workspaces/${workspacesId}/todos/${result.insertedId}`)
          .send()
          .expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on load', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app)
          .get(`/api/workspaces/${todo.workspacesId}/todos/${result.insertedId}`)
          .set('x-access-token', accessToken)
          .send()
          .expect(200)

        expect(response.body.text).toEqual(todo.text)
        expect(response.body.workspacesId).toEqual(todo.workspacesId)
      })
    })

    describe('search', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const workspacesId = faker.random.numeric(6)

        await todosCollection.insertOne(todo)
        const response = await request(app)
          .get(`/api/workspaces/${workspacesId}`)
          .send()
          .expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on loadAll', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()

        await todosCollection.insertMany([
          { ...todo, text: 'text' },
          { ...todo, text: 'second text' },
          { ...todo }
        ])

        const response = await request(app)
          .get(`/api/workspaces/${todo.workspacesId}`)
          .query({ q: 'text' })
          .set('x-access-token', accessToken)
          .send()
          .expect(200)

        expect(response.body.todos.length).toBe(2)
        expect(response.body.todos[0].text).toEqual('text')
        expect(response.body.todos[1].text).toEqual('second text')
      })
    })
  })
})
