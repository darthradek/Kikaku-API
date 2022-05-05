//SECTION: Imports
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import Logging from './library/Logging';

//ANCHOR: Route Imports
import userRoutes from './routes/user';
import teamRoutes from './routes/team';
import projectRoutes from './routes/project';

const server = express();

//SECTION: Setting up swagger
// swagger deps
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
// setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//SECTION: Setting up MongoDB connections
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
    })
    .catch((error) => Logging.error(error));

//NOTE: Only start server if MongoDB connects

server.use((req, res, next) => {
    //NOTE: Log the req
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        //NOTE: Log the res
        Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

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
server.use('/user', userRoutes);
server.use('/team', teamRoutes);
server.use('/project', projectRoutes);

/** Healthcheck */
server.get('/welcome', (req, res, next) => res.status(200).send({ message: 'Welcome to Kikaku API' }));

//SECTION: Error Handling
server.use((req, res, next) => {
    const error = new Error('Route not found');

    Logging.error(error);

    res.status(404).json({
        message: error.message
    });
});

server.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

module.exports = server;
