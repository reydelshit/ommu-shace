import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser } from '../api/authService';

// Hook for user registration
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({
      username,
      fullname,
      email,
      password,
      phoneNumber,
      address,
      birthday,
    }: {
      username: string;
      fullname: string;
      email: string;
      password: string;
      phoneNumber: string;
      address: string;
      birthday: string;
    }) =>
      registerUser(
        username,
        fullname,
        email,
        password,
        phoneNumber,
        address,
        birthday,
      ),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};
