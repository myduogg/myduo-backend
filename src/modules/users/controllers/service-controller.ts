import { Request, Response } from 'express'

import { CreateUserService } from '../services/createUserService'
import { ListUserService } from '../services/listUserService'
import { ShowUserService } from '../services/showUserService'
import { DeleteUserService } from '../services/deleteUserService'
import { SendEmailService } from '../services/sendEmailService'

export default class UsersController {
  async email (request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendEmail = new SendEmailService()

    sendEmail.send(email)

    return response.json({})
  }

  async show (request: Request, response: Response): Promise<Response> {
    const { email } = request.params

    const showProduct = new ShowUserService()

    const product = await showProduct.execute({ email })

    return response.json(product)
  }

  async index (request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService()

    const users = await listUser.execute()

    return response.json(users)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { name, last_name, email, genre, birth_date, password, phone } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      last_name,
      email,
      genre,
      birth_date,
      password,
      phone
    })

    const Mailer = new SendEmailService()
    Mailer.send(email)

    return response.json(user)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteProduct = new DeleteUserService()

    await deleteProduct.execute({
      id
    })

    return response.json([])
  }
}
