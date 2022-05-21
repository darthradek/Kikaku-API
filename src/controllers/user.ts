import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import Logging from '../library/Logging';
import * as jwt from 'jsonwebtoken';

import bcryptjs from 'bcryptjs';
import signToken from '../helpers/signToken';
import config from '../config/config';

const getLoggedInUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    Logging.info(token);
    if (token) {
        jwt.verify(token, config.token.secret, (err: any, user: any) => {
            if (err) {
                Logging.error(err);
                return res.status(403).send({ success: false, message: 'Token Expired' });
            } else {
                const username = user.username;
                return User.find({ username })
                    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
                    .catch((error) => res.status(500).json({ error }));
            }
        });
    } else {
        res.status(403).json({ success: false, message: 'Token is not valid' });
    }
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    User.find({ email })
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

const getUserById = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'User deleted successfully' }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { getLoggedInUser, registerUser, loginUser, getAllUsers, getUserById, deleteUser, updateUser };
