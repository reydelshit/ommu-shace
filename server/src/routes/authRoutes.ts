import express from 'express';
import { login, logout, refreshToken } from '../controller/authController';
import { register } from '../controller/userController';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;
