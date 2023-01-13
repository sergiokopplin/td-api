import { ObjectId } from 'mongodb'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  LoadTodoRepository,
  LoadTodosRepository,
  UpdateTodoRepository,
  UpdateTodoStateRepository
} from '@/data/protocols'
import { MongoHelper, RepositoryHelper } from '@/infra/db'
import { TodoId, TodoWorkspacesId } from '@/domain/models'

export class TodosMongoRepository
implements
    AddTodoRepository,
    DeleteTodoRepository,
    LoadTodoRepository,
    LoadTodosRepository,
    UpdateTodoRepository,
    UpdateTodoStateRepository {
  async add (todo: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.insertOne(
      RepositoryHelper.mapValidKeys(
        {
          done: false
        },
        todo
      )
    )
    return { todo: MongoHelper.mapId(result.ops[0]) }
  }

  async delete (id: TodoId, workspacesId: TodoWorkspacesId): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteOne({ _id: new ObjectId(id), workspacesId })
  }

  async deleteDone (workspacesId: TodoWorkspacesId): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteMany({
      workspacesId,
      done: true
    })
  }

  async update (todo: UpdateTodoRepository.Params): Promise<UpdateTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.updateOne(
      { _id: new ObjectId(todo.id) },
      {
        $set: todo
      }
    )

    const result = await this.load(todo)

    return result && { todo: result }
  }

  async updateState (params: UpdateTodoStateRepository.Params): Promise<UpdateTodoStateRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          done: params.done
        }
      }
    )

    const result = await collection.findOne({
      _id: new ObjectId(params.id),
      workspacesId: params.workspacesId
    })

    return result && { todo: MongoHelper.mapId(result) }
  }

  async loadAll (workspacesId: TodoWorkspacesId): Promise<LoadTodosRepository.Result[]> {
    const collection = await MongoHelper.getCollection('todos')
    const result = collection.find({ workspacesId })
    const list = await result.toArray()
    return result && list.map(item => MongoHelper.mapId(item))
  }

  async load (todo: LoadTodoRepository.Params): Promise<LoadTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.findOne({
      _id: new ObjectId(todo.id),
      workspacesId: todo.workspacesId
    })
    return result && MongoHelper.mapId(result)
  }
}
