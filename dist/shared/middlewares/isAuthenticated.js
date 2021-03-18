"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../../config/auth");
const app_error_1 = __importDefault(require("../errors/app-error"));
function isAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new app_error_1.default('JWT Token is missing.');
    }
    const [, token] = authHeader.split(' ');
    try {
        const decodeToken = jsonwebtoken_1.verify(token, auth_1.authConfig.jwt.secret);
        const { sub } = decodeToken;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (_a) {
        throw new app_error_1.default('Invalid JWT Token.');
    }
}
exports.isAuthenticated = isAuthenticated;
