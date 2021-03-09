import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import { SessionController } from '../controllers/session-controller'

const sessionsRouter = Router()

const sessionController = new SessionController()

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionController.create
)

export { sessionsRouter }
