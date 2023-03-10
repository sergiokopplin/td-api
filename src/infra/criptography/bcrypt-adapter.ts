import { hash, compare as bcompare } from 'bcrypt'

import { type Hasher, type HashComparer } from '@/data/protocols/criptography'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    return await hash(plaintext, this.salt)
  }

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return await bcompare(plaintext, digest)
  }
}
