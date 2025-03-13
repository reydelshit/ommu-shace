import axiosInstance from './axiosInstance';

// Register API function
export const registerUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/register', {
    email,
    password,
  });
  return response.data;
};

// Login API function
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { email, password });

  return response.data;
};
