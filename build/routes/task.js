"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../controllers/task"));
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const router = express_1.default.Router();
router.post('/create', validateToken_1.default, task_1.default.createTask);
router.delete('/delete/:taskId', validateToken_1.default, task_1.default.deleteTask);
module.exports = router;
