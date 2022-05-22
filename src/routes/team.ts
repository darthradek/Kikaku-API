import express from 'express';
import controller from '../controllers/team';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/create', validateToken, controller.createTeam);
router.get('', validateToken, controller.getAllTeams);
router.get('/:teamId', validateToken, controller.getTeamById);
router.patch('/update/:teamId', validateToken, controller.updateTeam);
router.delete('/delete/:teamId', validateToken, controller.deleteTeam);

export = router;
