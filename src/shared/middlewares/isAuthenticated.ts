import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { authConfig } from '../../config/auth'
import AppError from '../errors/app-error'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}
export function isAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }
  const [, token] = authHeader.split(' ')

  try {
    const decodeToken = verify(token, authConfig.jwt.secret)

    const { sub } = decodeToken as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token.')
  }
}
