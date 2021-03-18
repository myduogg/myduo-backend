import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from '../../../shared/middlewares/isAuthenticated'
import multer from 'multer'

import UsersController from '../controllers/service-controller'
import uploadConfig from '../../../config/upload'
import { UserAvatarController } from '../controllers/user-avatar-controller'

const usersRouter = Router()

const usersController = new UsersController()

const usersAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)

usersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.delete
)

export { usersRouter }
