"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const router = express_1.default.Router();
router.get('/authenticate', user_1.default.getLoggedInUser);
router.post('/login', user_1.default.loginUser);
router.post('/register', user_1.default.registerUser);
router.get('', validateToken_1.default, user_1.default.getAllUsers);
router.get('/:userId', validateToken_1.default, user_1.default.getUserById);
router.patch('/update/:userId', validateToken_1.default, user_1.default.updateUser);
router.delete('/delete/:userId', validateToken_1.default, user_1.default.deleteUser);
module.exports = router;
