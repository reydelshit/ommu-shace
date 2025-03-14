import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail, getUserById } from '../services/userService';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

const generateAccessToken = (userId: string) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

export const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required.',
        });
        return;
      }

      const user = await getUserByEmail(email);
      if (!user || !(password === user.password)) {
        throw new Error('Invalid email or password');
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ success: true, user });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  },

  refreshToken: async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res
          .status(403)
          .json({ success: false, message: 'Refresh token required.' });
        return;
      }

      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        userId: string;
      };
      const user = await getUserById(decoded.userId);
      if (!user) {
        throw new Error('User not found.');
      }

      const newAccessToken = generateAccessToken(user.id);
      res.json({ success: true, accessToken: newAccessToken });
    } catch (error: any) {
      res
        .status(403)
        .json({ success: false, message: 'Invalid or expired refresh token.' });
    }
  },

  logout: (req: Request, res: Response): void => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ success: true, message: 'Logged out successfully.' });
  },
};
