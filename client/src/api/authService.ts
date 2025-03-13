import axiosInstance from './axiosInstance';

// Register API function
export const registerUser = async (
  username: string,
  fullname: string,
  email: string,
  password: string,
  phoneNumber: string,
  address: string,
  birthday: string,
) => {
  const response = await axiosInstance.post('/auth/register', {
    username,
    fullname,
    email,
    password,
    phoneNumber,
    address,
    birthday,
  });
  return response.data;
};

// Login API function
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { email, password });

  return response.data;
};
