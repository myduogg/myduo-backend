import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'

import { authConfig } from '../../../config/auth'
import AppError from '../../../shared/errors/app-error'
import { User } from '../typeorm/entities/User'
import { UserRepository } from '../typeorm/repositories/UsersRepository'

interface UserDTO {
  email: string
  password: string
}

interface IUserResponse {
  user: User
  token: string
}

export class CreateSessionService {
  async execute ({ email, password }: UserDTO): Promise<IUserResponse> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      user,
      token
    }
  }
}
