//SECTION: Imports
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

//ANCHOR: Route Imports
// import authorRoutes from './routes/Author';
// import bookRoutes from './routes/Book';

const router = express();

//SECTION: Setting up swagger
// swagger deps
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
// setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
router.use('/kikaku/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));


//SECTION: Setting up MongoDB connections
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

//NOTE: Only start server if MongoDB connects
const StartServer = () => {
    router.use((req, res, next) => {
        //NOTE: Log the req
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //NOTE: Log the res
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //SECTION: Setting up API rules, CORS
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    //SECTION: Routes
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'pong' }));

    //SECTION: Error Handling
    router.use((req, res, next) => {
        const error = new Error('Route not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
