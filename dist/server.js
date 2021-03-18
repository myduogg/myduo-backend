"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("reflect-metadata");
const routes_1 = require("./routes");
const app_error_1 = __importDefault(require("./shared/errors/app-error"));
require("./shared/typeorm");
const celebrate_1 = require("celebrate");
const swaggerOptions_1 = require("./config/swaggerOptions");
const swagger_json_1 = __importDefault(require("./config/swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = express_1.default();
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use(routes_1.router);
app.use(celebrate_1.errors());
app.use((error, req, response, next) => {
    if (error instanceof app_error_1.default) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
const port = process.env.PORT || 3003;
app.get('/', (req, res) => {
    res.send('Bem vindo ao MyduoGG :)');
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, swaggerOptions_1.options));
app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', `=> 🚀 Server running on the port: ${port}`);
});
