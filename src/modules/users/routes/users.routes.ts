import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from 'src/shared/middlewares/isAuthenticated'

import UsersController from '../controllers/service-controller'

const usersRouter = Router()

const usersController = new UsersController()

usersRouter.get('/', isAuthenticated, usersController.index)

usersRouter.post('/email', usersController.email)

usersRouter.get(
  '/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().email().required()
    }
  }),
  usersController.show
)
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      last_name: Joi.string().required(),
      password: Joi.string().required(),
      genre: Joi.string().required(),
      birth_date: Joi.date().required(),
      email: Joi.string().email().required()

    }
  }),
  usersController.create
)

usersRouter.delete('/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().email().required()
    }
  }),
  usersController.delete
)

export { usersRouter }
