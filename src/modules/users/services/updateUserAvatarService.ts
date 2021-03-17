import fs from 'fs'
import path from 'path'
import { getCustomRepository } from 'typeorm'

import uploadConfig from '../../../config/upload'
import AppError from '../../../shared/errors/app-error'
import { UserRepository } from '../typeorm/repositories/UsersRepository'
interface UserDTO {
  user_id: string
  avatarFilename: string
}

export class UpdateUserAvatarService {
  async execute ({ user_id, avatarFilename }: UserDTO): Promise<String> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user.avatar
  }
}
