import { EmailRepository } from '../nodemailer/repositories/EmailRepository'

export class SendEmailService extends EmailRepository {
  async send (email : string) {
    this.create(email)
  }
}
