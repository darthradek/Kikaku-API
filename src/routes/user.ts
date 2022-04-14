import express from 'express';
import controller from '../controllers/user';
import extractToken from '../middleware/extractToken';

const router = express.Router();

router.get('/authenticate', extractToken, controller.validateToken);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/getAll', controller.getAllUsers);

export = router;
