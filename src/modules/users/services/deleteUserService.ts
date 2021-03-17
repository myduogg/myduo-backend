import { getCustomRepository } from 'typeorm'

import AppError from '../../../shared/errors/app-error'
import { UserRepository } from '../typeorm/repositories/UsersRepository'

interface UserDTO {
  id: string
}
export class DeleteUserService {
  async execute ({ id }: UserDTO): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found')
    }
    await usersRepository.remove(user)
  }
}
