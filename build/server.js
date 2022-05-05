"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//SECTION: Imports
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const Logging_1 = __importDefault(require("./library/Logging"));
//ANCHOR: Route Imports
const user_1 = __importDefault(require("./routes/user"));
const team_1 = __importDefault(require("./routes/team"));
const project_1 = __importDefault(require("./routes/project"));
const server = (0, express_1.default)();
//SECTION: Setting up swagger
// swagger deps
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
// setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
//SECTION: Setting up MongoDB connections
mongoose_1.default
    .connect(config_1.default.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Mongo connected successfully.');
})
    .catch((error) => Logging_1.default.error(error));
//NOTE: Only start server if MongoDB connects
server.use((req, res, next) => {
    //NOTE: Log the req
    Logging_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        //NOTE: Log the res
        Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    next();
});
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
//SECTION: Setting up API rules, CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//SECTION: Routes
server.use('/user', user_1.default);
server.use('/team', team_1.default);
server.use('/project', project_1.default);
/** Healthcheck */
server.get('/welcome', (req, res, next) => res.status(200).send({ message: 'Welcome to Kikaku API' }));
//SECTION: Error Handling
server.use((req, res, next) => {
    const error = new Error('Route not found');
    Logging_1.default.error(error);
    res.status(404).json({
        message: error.message
    });
});
server.listen(config_1.default.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.default.server.port}`));
module.exports = server;
