import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/userService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      res
        .status(400)
        .json({ success: false, message: 'Email already in use.' });
      return;
    }

    const user = await createUser(email, password);
    res
      .status(201)
      .json({ success: true, message: 'User registered successfully.', user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
