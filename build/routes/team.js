"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const team_1 = __importDefault(require("../controllers/team"));
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const router = express_1.default.Router();
router.post('/create', validateToken_1.default, team_1.default.createTeam);
router.get('', validateToken_1.default, team_1.default.getAllTeams);
router.get('/:userId', validateToken_1.default, team_1.default.getTeamById);
router.patch('/update/:userId', validateToken_1.default, team_1.default.updateTeam);
router.delete('/delete/:teamId', validateToken_1.default, team_1.default.deleteTeam);
module.exports = router;
