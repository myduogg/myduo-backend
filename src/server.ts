import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import { router } from './routes'
import AppError from './shared/errors/app-error'
import './shared/typeorm'
import { errors } from 'celebrate'
import { options } from './config/swaggerOptions'
import swaggerDocument from './config/swagger.json'

import swaggerUi from 'swagger-ui-express'

const app = express()
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use(router)

app.use(errors())

app.use(
  (error: Error, req: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

const port = process.env.PORT || 3333

app.get('/', (req, res) => {
  res.send('Bem vindo ao MyduoGG :)')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
const host = '0.0.0.0'
app.listen(port,host, () => {
  console.log('\x1b[33m%s\x1b[0m', `=> 🚀 Server running on the port: ${port}`)
})
