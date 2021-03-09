import { getCustomRepository } from 'typeorm'

import AppError from '../../../shared/errors/app-error'
import { User } from '../typeorm/entities/User'
import { UserRepository } from '../typeorm/repositories/UsersRepository'

interface UserDTO {
  email: string
}
export class ShowUserService {
  async execute ({ email }: UserDTO): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}
