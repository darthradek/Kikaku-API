import express from 'express';
import controller from '../controllers/user';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.get('/authenticate', validateToken, controller.validateUserToken);
router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);
router.get('/getAll', validateToken, controller.getAllUsers);
router.get('/:userId', validateToken, controller.getUserById);
router.patch('/update/:userId', validateToken, controller.updateUser);
router.delete('/delete/:userId', validateToken, controller.deleteUser);

export = router;
