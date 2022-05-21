import jwt from 'jsonwebtoken';
import config from '../config/config';
import Logging from '../library/Logging';
import { Request, Response, NextFunction } from 'express';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('Validating token, middleware');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Token is not valid, unauthorized'
        });
    }
};

export default validateToken;
