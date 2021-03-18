"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRepository = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
require('dotenv').config();
class EmailRepository {
    async create(email) {
        const transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'myduogg@gmail.com',
                pass: process.env.GMAILPWD
            }
        }));
        const mailOptions = {
            from: 'myduogg@gmail.com',
            to: email,
            subject: 'Bem vindo ao MyDuo',
            text: 'Aproveite para adicionar qualquer jogo na sua lista e se conectar com outros jogadores :D.'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error.name);
            }
            else {
                console.log(`Email enviado: ${info.response}`);
            }
        });
    }
}
exports.EmailRepository = EmailRepository;
