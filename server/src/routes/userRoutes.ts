import express from 'express';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.get('/me', authenticateToken, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

export default router;
