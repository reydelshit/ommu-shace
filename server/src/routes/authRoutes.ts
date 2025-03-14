import express from 'express';
import { authController } from '../controller/authController';
import { userController } from '../controller/userController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', userController.register);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
