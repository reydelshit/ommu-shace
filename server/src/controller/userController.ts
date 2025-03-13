import { Request, Response } from 'express';
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from '../services/userService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      fullname,
      email,
      password,
      phoneNumber,
      address,
      birthday,
    } = req.body;

    console.log(req.body);

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: 'Email and password are required.' });
      return;
    }

    // Check email and username availability
    const emailExist = await getUserByEmail(email);
    const userExists2 = await getUserByUsername(username);

    if (emailExist) {
      console.error('Email already in use.');
      res
        .status(400)
        .json({ success: false, message: 'Email already in use.' });
      return;
    }

    if (userExists2) {
      console.error('Username already in use.');
      res
        .status(400)
        .json({ success: false, message: 'Username already in use.' });
      return;
    }

    console.log('Creating user...');
    const user = await createUser(
      username,
      fullname,
      email,
      password,
      phoneNumber,
      address,
      birthday,
    );
    console.log('User created:', user);

    res
      .status(201)
      .json({ success: true, message: 'User registered successfully.', user });
  } catch (error: any) {
    console.error('Error in register function:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
