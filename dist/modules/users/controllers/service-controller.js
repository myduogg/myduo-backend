"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createUserService_1 = require("../services/createUserService");
const listUserService_1 = require("../services/listUserService");
const showUserService_1 = require("../services/showUserService");
const deleteUserService_1 = require("../services/deleteUserService");
const sendEmailService_1 = require("../services/sendEmailService");
class UsersController {
    async email(request, response) {
        const { email } = request.body;
        const sendEmail = new sendEmailService_1.SendEmailService();
        sendEmail.send(email);
        return response.json({});
    }
    async show(request, response) {
        const { email } = request.params;
        const showProduct = new showUserService_1.ShowUserService();
        const product = await showProduct.execute({ email });
        return response.json(product);
    }
    async index(request, response) {
        const listUser = new listUserService_1.ListUserService();
        const users = await listUser.execute();
        return response.json(users);
    }
    async create(request, response) {
        const { name, last_name, email, genre, birth_date, password, phone } = request.body;
        const createUser = new createUserService_1.CreateUserService();
        const user = await createUser.execute({
            name,
            last_name,
            email,
            genre,
            birth_date,
            password,
            phone
        });
        const Mailer = new sendEmailService_1.SendEmailService();
        Mailer.send(email);
        return response.json(user);
    }
    async delete(request, response) {
        const { id } = request.params;
        const deleteProduct = new deleteUserService_1.DeleteUserService();
        await deleteProduct.execute({
            id
        });
        return response.json([]);
    }
}
exports.default = UsersController;
