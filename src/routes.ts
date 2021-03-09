import { Router } from 'express'
import { sessionsRouter } from './modules/users/routes/sessions.routes'
import { usersRouter } from './modules/users/routes/users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)
export { router }
