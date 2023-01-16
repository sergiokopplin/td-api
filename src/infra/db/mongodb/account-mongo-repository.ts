import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'
import { AccountAccessToken, AccountEmail, AccountId, AccountRole } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository
implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.insertOne(account)
    return result.insertedId !== null
  }

  async checkByEmail (email: AccountEmail): Promise<CheckAccountByEmailRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.findOne({ email })
    return result !== null
  }

  async loadByEmail (email: AccountEmail): Promise<LoadAccountByEmailRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1
        }
      }
    )
    return result && MongoHelper.mapId(result)
  }

  async updateAccessToken (id: AccountId, token: AccountAccessToken): Promise<void> {
    const collection = await MongoHelper.getCollection('accounts')
    await collection.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }

  async loadByToken (token: AccountAccessToken, role?: AccountRole): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      {
        accessToken: token,
        $or: [
          {
            role
          },
          {
            role: 'admin'
          }
        ]
      },
      {
        projection: {
          _id: 1
        }
      }
    )
    return account && MongoHelper.mapId(account)
  }
}
