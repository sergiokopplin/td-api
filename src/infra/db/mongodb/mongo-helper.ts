import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  uri: null as string,
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async createIndex (): Promise<void> {
    await this.client
      .db()
      .collection('todos')
      .createIndex({ text: 'text' }, { default_language: 'pt' })
  },

  async getCollection (collection: string): Promise<Collection> {
    await this.connect(this.uri)
    return this.client.db().collection(collection)
  },

  mapId: (data: any): any => {
    const { _id, ...rest } = data
    return {
      ...rest,
      id: _id
    }
  }
}
