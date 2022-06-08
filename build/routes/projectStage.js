"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const projectStage_1 = __importDefault(require("../controllers/projectStage"));
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const router = express_1.default.Router();
router.post('/create', validateToken_1.default, projectStage_1.default.createProjectStage);
router.get('/:projectId', validateToken_1.default, projectStage_1.default.getAllProjectStagesForProject);
router.put('/update/:projectStageId', validateToken_1.default, projectStage_1.default.updateProjectStage);
router.delete('/delete/:projectStageId', validateToken_1.default, projectStage_1.default.deleteProjectStage);
module.exports = router;
