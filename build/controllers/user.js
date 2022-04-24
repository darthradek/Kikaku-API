"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const Logging_1 = __importDefault(require("../library/Logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signToken_1 = __importDefault(require("../helpers/signToken"));
const validateUserToken = (req, res, next) => {
    Logging_1.default.info('Token validated successfully, user authenticated!');
    return res.status(200).json({
        message: 'User authenticated successfully'
    });
};
const loginUser = (req, res, next) => {
    let { username, password } = req.body;
    user_1.default.find({ username })
        .exec()
        .then((users) => {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'Token cannot be validated, Unauthorized'
            });
        }
        bcryptjs_1.default.compare(password, users[0].password_hash, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Password Mismatch'
                });
            }
            else if (result) {
                (0, signToken_1.default)(users[0], (error, token) => {
                    if (error) {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    }
                    else if (token) {
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
const registerUser = (req, res, next) => {
    let { username, email, password } = req.body;
    bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        const user = new user_1.default({
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
const getAllUsers = (req, res, next) => {
    user_1.default.find()
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
const getUserById = (req, res, next) => {
    const userId = req.params.userId;
    return user_1.default.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    return user_1.default.findById(userId)
        .then((user) => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    return user_1.default.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'User deleted successfully' }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { validateUserToken, registerUser, loginUser, getAllUsers, getUserById, deleteUser, updateUser };
