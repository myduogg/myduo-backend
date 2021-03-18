"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const createSessionService_1 = require("../services/createSessionService");
class SessionController {
    async create(request, response) {
        const { email, password } = request.body;
        const createSessionService = new createSessionService_1.CreateSessionService();
        const user = await createSessionService.execute({
            email,
            password
        });
        return response.json(user);
    }
}
exports.SessionController = SessionController;
