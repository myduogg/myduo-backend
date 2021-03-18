"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserService = void 0;
const typeorm_1 = require("typeorm");
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
class ListUserService {
    async execute() {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.UserRepository);
        const users = await usersRepository.find();
        return users;
    }
}
exports.ListUserService = ListUserService;
