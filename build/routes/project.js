"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const project_1 = __importDefault(require("../controllers/project"));
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const router = express_1.default.Router();
router.post('/create', validateToken_1.default, project_1.default.createProject);
router.get('/getAll', validateToken_1.default, project_1.default.getAllProjects);
router.get('/:projectId', validateToken_1.default, project_1.default.getProjectById);
router.patch('/update/:projectId', validateToken_1.default, project_1.default.updateProject);
router.delete('/delete/:projectId', validateToken_1.default, project_1.default.deleteProject);
module.exports = router;
