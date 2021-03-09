import { getCustomRepository } from 'typeorm'

import { User } from '../typeorm/entities/User'
import { UserRepository } from '../typeorm/repositories/UsersRepository'

export class ListUserService {
  async execute (): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository)

    const users = await usersRepository.find()

    return users
  }
}
