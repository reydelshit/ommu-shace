import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  return prisma.user.create({
    data: { email, password: hashedPassword },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId } });
};
