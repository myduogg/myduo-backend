"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const session_controller_1 = require("../controllers/session-controller");
const sessionsRouter = express_1.Router();
exports.sessionsRouter = sessionsRouter;
const sessionController = new session_controller_1.SessionController();
sessionsRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    }
}), sessionController.create);
