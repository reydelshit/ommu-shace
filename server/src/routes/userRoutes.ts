import express from 'express';
import { register } from '../controller/userController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.get('/me', authenticateToken, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

export default router;
