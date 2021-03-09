import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
require('dotenv').config()

export class EmailRepository {
  protected async create (email: string) {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'myduogg@gmail.com',
          pass: process.env.GMAILPWD
        }
      })
    )

    const mailOptions = {
      from: 'myduogg@gmail.com',
      to: email,
      subject: 'Bem vindo ao MyDuo',
      text: 'Aproveite para adicionar qualquer jogo na sua lista e se conectar com outros jogadores :D.'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.name)
      } else {
        console.log(`Email enviado: ${info.response}`)
      }
    })
  }
}
