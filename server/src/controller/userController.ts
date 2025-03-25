import { Request, Response } from 'express';
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
} from '../services/userService';
import { User } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads'); // Store in 'uploads' folder
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Unique filename
  },
});

const upload = multer({ storage });

export const userController = {
  register: async (req: Request, res: Response): Promise<void> => {
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
        res.status(400).json({
          success: false,
          message: 'Email and password are required.',
        });
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

      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        user,
      });
    } catch (error: any) {
      console.error('Error in register function:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        id,
        fullname,
        username,
        email,
        phoneNumber,
        bio,
        interests,
        address,
        birthday,
        password,
      } = req.body;

      if (!id) {
        res
          .status(400)
          .json({ success: false, message: 'User ID is required' });
        return;
      }

      const existingUser = await getUserById(id);
      if (!existingUser) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      if (username && username !== existingUser.username) {
        const usernameExists = await getUserByUsername(username);
        if (usernameExists) {
          res
            .status(400)
            .json({ success: false, message: 'Username already in use' });
          return;
        }
      }

      if (email && email !== existingUser.email) {
        const emailExists = await getUserByEmail(email);
        if (emailExists) {
          res
            .status(400)
            .json({ success: false, message: 'Email already in use' });
          return;
        }
      }

      // Handle image uploads
      let profilePicture = existingUser.profilePicture;
      let coverPicture = existingUser.coverPicture;

      if (req.files && Object.keys(req.files).length > 0) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        if (files.profilePicture && files.profilePicture.length > 0) {
          profilePicture = `/uploads/profile/${files.profilePicture[0].filename}`;
        }
        if (files.coverPicture && files.coverPicture.length > 0) {
          coverPicture = `/uploads/cover/${files.coverPicture[0].filename}`;
        }
      }

      const updateData: Partial<User> = {
        fullname,
        username,
        email,
        phoneNumber,
        profilePicture,
        coverPicture,
        bio,
        interests,
        address,
        birthday,
      };

      if (password) {
        updateData.password = password;
      }

      Object.keys(updateData).forEach(
        (key) =>
          updateData[key as keyof Partial<User>] === undefined &&
          delete updateData[key as keyof Partial<User>],
      );

      const updatedUser = await updateUser(id, updateData);

      console.log('User updated:', updatedUser);

      // console.log('req.files:', req.files);
      // console.log('req.body:', req.body);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error: any) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
