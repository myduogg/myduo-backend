import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'

import AppError from '../../../shared/errors/app-error'

import { User } from '../typeorm/entities/User'
import { UserRepository } from '../typeorm/repositories/UsersRepository'

interface UserDTO {
  name: string
  last_name: string
  email: string
  password: string
  genre: string
  birth_date: string
  phone: string
}

export class CreateUserService {
  async execute ({ name, last_name, email, password, genre, birth_date, phone }: UserDTO): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository)

    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email já está em uso.')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      password: hashedPassword,
      last_name,
      email,
      genre,
      birth_date,
      phone

    })

    await usersRepository.save(user)

    return user
  }
}
