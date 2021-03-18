"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const auth_1 = require("../../../config/auth");
const app_error_1 = __importDefault(require("../../../shared/errors/app-error"));
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
class CreateSessionService {
    async execute({ email, password }) {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.UserRepository);
        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new app_error_1.default('Incorrect email/password combination.', 401);
        }
        const passwordConfirmed = await bcryptjs_1.compare(password, user.password);
        if (!passwordConfirmed) {
            throw new app_error_1.default('Incorrect email/password combination.', 401);
        }
        const token = jsonwebtoken_1.sign({}, auth_1.authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: auth_1.authConfig.jwt.expiresIn
        });
        return {
            user,
            token
        };
    }
}
exports.CreateSessionService = CreateSessionService;
