import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import Logging from '../library/Logging';
import bcryptjs from 'bcryptjs';
import signToken from '../helpers/signToken';

const validateUserToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('Token validated successfully, user authenticated!');

    return res.status(200).json({
        message: 'User authenticated successfully'
    });
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Token cannot be validated, Unauthorized'
                });
            }

            bcryptjs.compare(password, users[0].password_hash, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                    signToken(users[0], (error, token) => {
                        if (error) {
                            return res.status(500).json({
                                message: error.message,
                                error: error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Authenticated successfully',
                                token: token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

const registerUser = (req: Request, res: Response, next: NextFunction) => {
    let { username, email, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        const user = new User({
            username,
            email,
            password_hash: hash
        });

        return user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { validateUserToken, registerUser, loginUser, getAllUsers };
