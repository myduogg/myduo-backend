"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const app_error_1 = __importDefault(require("../../../shared/errors/app-error"));
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
class CreateUserService {
    async execute({ name, last_name, email, password, genre, birth_date, phone }) {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.UserRepository);
        const emailExists = await usersRepository.findByEmail(email);
        if (emailExists) {
            throw new app_error_1.default('Email já está em uso.');
        }
        const hashedPassword = await bcryptjs_1.hash(password, 8);
        const user = usersRepository.create({
            name,
            password: hashedPassword,
            last_name,
            email,
            genre,
            birth_date,
            phone
        });
        await usersRepository.save(user);
        return user;
    }
}
exports.CreateUserService = CreateUserService;
