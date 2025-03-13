import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    token = req.cookies?.accessToken;
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Access token required' });

    return;
  }

  jwt.verify(token, JWT_SECRET, async (err, decodedUser: any) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: 'Invalid or expired token' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: decodedUser.userId },
        select: {
          id: true,
          email: true,
          username: true,
          fullname: true,
          phoneNumber: true,
          address: true,
          birthday: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res
          .status(403)
          .json({ success: false, message: 'User not found' });
      }

      (req as any).user = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Database error', error });
    }
  });
};
