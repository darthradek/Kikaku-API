import express from 'express';
import controller from '../controllers/project';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/create', validateToken, controller.createProject);
router.get('/getAll', validateToken, controller.getAllProjects);
router.get('/:projectId', validateToken, controller.getProjectById);
router.patch('/update/:projectId', validateToken, controller.updateProject);
router.delete('/delete/:projectId', validateToken, controller.deleteProject);

export = router;
