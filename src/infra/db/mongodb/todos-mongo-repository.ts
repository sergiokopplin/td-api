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
          done: false
        },
        todo
      )
    )
    return MongoHelper.mapId(result.ops[0])
  }

  async delete (id: string, workspacesId: number): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteOne({ _id: new ObjectId(id), workspacesId })
  }

  async deleteDone (workspacesId: number): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteMany({
      workspacesId,
      done: true
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

  async loadAll (workspacesId: number): Promise<LoadTodosRepository.Result[]> {
    const collection = await MongoHelper.getCollection('todos')
    const result = collection.find({ workspacesId })
    const list = await result.toArray()
    return result && list.map(item => MongoHelper.mapId(item))
  }

  async load (todo: LoadTodoRepository.Param): Promise<LoadTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.findOne({
      _id: new ObjectId(todo.id),
      workspacesId: todo.workspacesId
    })
    return result && MongoHelper.mapId(result)
  }
}
