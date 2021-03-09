require('dotenv').config()
export const authConfig = {
  jwt: {
    secret: process.env.JWTSECRET,
    expiresIn: '60d'
  }
}
