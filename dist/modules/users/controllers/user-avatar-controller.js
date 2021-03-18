"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAvatarController = void 0;
const updateUserAvatarService_1 = require("../services/updateUserAvatarService");
class UserAvatarController {
    async update(request, response) {
        const updateAvatar = new updateUserAvatarService_1.UpdateUserAvatarService();
        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });
        return response.json(user);
    }
}
exports.UserAvatarController = UserAvatarController;
