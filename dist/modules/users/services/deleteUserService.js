"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserService = void 0;
const typeorm_1 = require("typeorm");
const app_error_1 = __importDefault(require("../../../shared/errors/app-error"));
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
class DeleteUserService {
    async execute({ id }) {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.UserRepository);
        const user = await usersRepository.findById(id);
        if (!user) {
            throw new app_error_1.default('User not found');
        }
        await usersRepository.remove(user);
    }
}
exports.DeleteUserService = DeleteUserService;
