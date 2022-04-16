import express from 'express';
import controller from '../controllers/user';
import extractToken from '../middleware/extractToken';

const router = express.Router();

router.get('/authenticate', extractToken, controller.validateUserToken);
router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);
router.get('/getAll', controller.getAllUsers);

export = router;
