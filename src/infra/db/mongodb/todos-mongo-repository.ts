import { ObjectId } from 'mongodb'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  UpdateTodoRepository,
  LoadTodosRepository,
  LoadTodoRepository
} from '@/data/protocols'
import { MongoHelper, RepositoryHelper } from '@/infra/db'
import { TodoId, TodoWorkspacesId } from '@/domain/models'

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
    await collection.findOneAndReplace(
      { _id: new ObjectId(todo.id) },
      todo
    )
    const result = await this.load(todo)
    return result && result
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
