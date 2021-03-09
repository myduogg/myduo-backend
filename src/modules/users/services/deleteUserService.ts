import { getCustomRepository } from 'typeorm'

import AppError from '../../../shared/errors/app-error'
import { UserRepository } from '../typeorm/repositories/UsersRepository'

interface UserDTO {
  email: string
}
export class DeleteUserService {
  async execute ({ email }: UserDTO): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found')
    }
    await usersRepository.remove(user)
  }
}
