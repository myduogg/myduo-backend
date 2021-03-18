"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const isAuthenticated_1 = require("../../../shared/middlewares/isAuthenticated");
const multer_1 = __importDefault(require("multer"));
const service_controller_1 = __importDefault(require("../controllers/service-controller"));
const upload_1 = __importDefault(require("../../../config/upload"));
const user_avatar_controller_1 = require("../controllers/user-avatar-controller");
const usersRouter = express_1.Router();
exports.usersRouter = usersRouter;
const usersController = new service_controller_1.default();
const usersAvatarController = new user_avatar_controller_1.UserAvatarController();
const upload = multer_1.default(upload_1.default);
usersRouter.get('/', isAuthenticated_1.isAuthenticated, usersController.index);
usersRouter.post('/email', usersController.email);
usersRouter.get('/:email', celebrate_1.celebrate({
    [celebrate_1.Segments.PARAMS]: {
        email: celebrate_1.Joi.string().email().required()
    }
}), usersController.show);
usersRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        last_name: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        genre: celebrate_1.Joi.string().required(),
        birth_date: celebrate_1.Joi.date().required(),
        email: celebrate_1.Joi.string().email().required()
    }
}), usersController.create);
usersRouter.patch('/avatar', isAuthenticated_1.isAuthenticated, upload.single('avatar'), usersAvatarController.update);
usersRouter.delete('/:id', celebrate_1.celebrate({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), usersController.delete);
