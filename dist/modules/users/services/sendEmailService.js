"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const EmailRepository_1 = require("../nodemailer/repositories/EmailRepository");
class SendEmailService extends EmailRepository_1.EmailRepository {
    async send(email) {
        this.create(email);
    }
}
exports.SendEmailService = SendEmailService;
