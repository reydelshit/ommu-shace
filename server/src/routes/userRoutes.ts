import express from 'express';
import { authenticateToken } from '../middlewares/auth';
import { userController } from '../controller/userController';
import upload from '../middlewares/upload';

const router = express.Router();

const uploadProfileImages = upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'coverPicture', maxCount: 1 },
]);

router.get('/me', authenticateToken, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

router.put('/update', uploadProfileImages, userController.updateProfile);

export default router;
