import express from 'express';
import { login, logout, refreshToken } from '../controller/authController';

const router = express.Router();

router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;
