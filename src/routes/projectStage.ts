import express from 'express';
import controller from '../controllers/projectStage';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/create', validateToken, controller.createProjectStage);
router.get('/:projectId', validateToken, controller.getAllProjectStagesForProject);
router.put('/update/:projectStageId', validateToken, controller.updateProjectStage);
router.delete('/delete/:projectStageId', validateToken, controller.deleteProjectStage);

export = router;
