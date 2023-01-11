import { ObjectId } from 'mongodb'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  UpdateTodoRepository,
  LoadTodosRepository,
  LoadTodoRepository
} from '@/data/protocols'
import { MongoHelper, RepositoryHelper } from '@/infra/db'

export class TodosMongoRepository
implements
    AddTodoRepository,
    DeleteTodoRepository,
    UpdateTodoRepository,
    LoadTodosRepository,
    LoadTodoRepository {
  async add (todo: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.insertOne(
      RepositoryHelper.mapValidKeys(
        {
          completed: false
        },
        todo
      )
    )
    return MongoHelper.mapId(result.ops[0])
  }

  async delete (id: string, workspaceId: string): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteOne({ _id: new ObjectId(id), workspaceId })
  }

  async deleteCompleted (workspaceId: string): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteMany({
      workspaceId,
      completed: true
    })
  }

  async update (todo: UpdateTodoRepository.Params): Promise<UpdateTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.findOneAndReplace(
      { _id: new ObjectId(todo.id) },
      todo,
      { returnOriginal: false }
    )
    return result.value && MongoHelper.mapId(result.value)
  }

  async loadAll (workspaceId: string): Promise<LoadTodosRepository.Result[]> {
    const collection = await MongoHelper.getCollection('todos')
    const result = collection.find({ workspaceId })
    const list = await result.toArray()
    return result && list.map(item => MongoHelper.mapId(item))
  }

  async load (todo: LoadTodoRepository.Param): Promise<LoadTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.findOne({
      _id: new ObjectId(todo.id),
      workspaceId: todo.workspaceId
    })
    return result && MongoHelper.mapId(result)
  }
}
