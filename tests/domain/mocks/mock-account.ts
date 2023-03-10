import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
