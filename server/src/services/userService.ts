import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (
  username: string,
  fullname: string,
  email: string,
  password: string,
  phoneNumber: string,
  address: string,
  birthday: string,
) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  // const hashedPassword = await bcrypt.hash(password, 12);
  return prisma.user.create({
    data: {
      username,
      fullname,
      email,
      password,
      phoneNumber,
      address,
      birthday,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const getUserByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId } });
};
