import express from 'express';
import controller from '../controllers/task';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/create', validateToken, controller.createTask);
router.delete('/delete/:taskId', validateToken, controller.deleteTask);

export = router;
