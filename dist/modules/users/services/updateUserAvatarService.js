"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const upload_1 = __importDefault(require("../../../config/upload"));
const app_error_1 = __importDefault(require("../../../shared/errors/app-error"));
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
class UpdateUserAvatarService {
    async execute({ user_id, avatarFilename }) {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.UserRepository);
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new app_error_1.default('User not found.');
        }
        if (user.avatar) {
            const userAvatarFilePath = path_1.default.join(upload_1.default.directory, user.avatar);
            const userAvatarFileExists = await fs_1.default.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs_1.default.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await usersRepository.save(user);
        return user.avatar;
    }
}
exports.UpdateUserAvatarService = UpdateUserAvatarService;
