import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser } from '../api/authService';

// Hook for user registration
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
  });
};

// Hook for user login
export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};
