import { loginUser, registerUser } from '@/api/serviceAuth';
import { useMutation } from '@tanstack/react-query';

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
