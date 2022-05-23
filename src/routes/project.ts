import express from 'express';
import controller from '../controllers/project';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/create', validateToken, controller.createProject);
router.get('', validateToken, controller.getAllProjects);
router.get('/:projectId', validateToken, controller.getProjectById);
router.get('/createdBy/:created_by', validateToken, controller.getAllProjectsCreatedByUser);
router.patch('/update/:projectId', validateToken, controller.updateProject);
router.delete('/delete/:projectId', validateToken, controller.deleteProject);

export = router;
