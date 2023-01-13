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

        expect(response.body.currentDate).toBe(currentDate.toISOString())
        expect(response.body.done).toBe(false)
        expect(response.body.text).toBe(text)
        expect(response.body.workspacesId).toBe(workspacesId)
        expect(response.body.id).toBeTruthy()
      })
    })

    describe('delete', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app).delete(`/api/todos/${result.insertedId}`).send().expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 204 on delete', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app)
          .delete(`/api/todos/${result.insertedId}`)
          .set('x-access-token', accessToken)
          .send()
          .expect(204)

        expect(response.body).toEqual({})
      })
    })

    describe('delete done', () => {
      test('Should return 403 without accessToken', async () => {
        const response = await request(app).delete('/api/todos-done').send().expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 204 on delete', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        await todosCollection.insertOne(todo)

        const response = await request(app)
          .delete('/api/todos-done')
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
          .put(`/api/workspaces/${workspacesId}/todos`)
          .send({
            id: result.ops[0]._id,
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
          .put(`/api/workspaces/${workspacesId}/todos`)
          .set('x-access-token', accessToken)
          .send({
            id: result.ops[0]._id,
            done: true,
            text: 'new text',
            currentDate: new Date()
          })
          .expect(200)

        expect(response.body.done).toBe(true)
        expect(response.body.text).toBe('new text')
        expect(response.body.id).toBeTruthy()
        expect(response.body.currentDate).toBeTruthy()
        expect(response.body.workspacesId).toBeTruthy()
      })

      test('Should return 404 when not exixting todo', async () => {
        const accessToken = await mockAccessToken()
        const workspacesId = faker.random.numeric(6)

        const response = await request(app)
          .put(`/api/workspaces/${workspacesId}/todos`)
          .set('x-access-token', accessToken)
          .send({
            id: '60480d9b39bab84bf07eac95',
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

    describe('loadAll', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()

        await todosCollection.insertOne(todo)
        const response = await request(app).get('/api/todos').send().expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on load', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()

        await todosCollection.insertOne(todo)
        await request(app).get('/api/todos').set('x-access-token', accessToken).send().expect(200)

        // TODO: fix response
        // expect(response.body).toEqual([{}])
      })
    })

    describe('load', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        const response = await request(app).get(`/api/todos/${result.insertedId}`).send().expect(403)

        expect(response.body).toEqual({
          error: 'Access denied'
        })
      })

      test('Should return 200 on load', async () => {
        const accessToken = await mockAccessToken()
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne(todo)

        await request(app)
          .get(`/api/todos/${result.insertedId}`)
          .set('x-access-token', accessToken)
          .send()
          .expect(200)

        // TODO: fix response
        // expect(response.body).toEqual([{}])
      })
    })
  })
})
