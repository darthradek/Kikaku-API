import express from 'express';
import controller from '../controllers/team';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/create', validateToken, controller.createTeam);
router.get('/getAll', validateToken, controller.getAllTeams);
router.get('/:userId', validateToken, controller.getTeamById);
router.patch('/update/:userId', validateToken, controller.updateTeam);
router.delete('/delete/:teamId', validateToken, controller.deleteTeam);

export = router;
