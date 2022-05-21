"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const Logging_1 = __importDefault(require("../library/Logging"));
const jwt = __importStar(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signToken_1 = __importDefault(require("../helpers/signToken"));
const config_1 = __importDefault(require("../config/config"));
const getLoggedInUser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    Logging_1.default.info(token);
    if (token) {
        jwt.verify(token, config_1.default.token.secret, (err, user) => {
            if (err) {
                Logging_1.default.error(err);
                return res.status(403).send({ success: false, message: 'Token Expired' });
            }
            else {
                const username = user.username;
                return user_1.default.find({ username })
                    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
                    .catch((error) => res.status(500).json({ error }));
            }
        });
    }
    else {
        res.status(403).json({ success: false, message: 'Token is not valid' });
    }
};
const loginUser = (req, res, next) => {
    let { email, password } = req.body;
    user_1.default.find({ email })
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
exports.default = { getLoggedInUser, registerUser, loginUser, getAllUsers, getUserById, deleteUser, updateUser };
