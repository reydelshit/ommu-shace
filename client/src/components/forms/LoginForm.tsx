import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useLoginUser } from '@/hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';

const LoginForm = () => {
  const mutationLogin = useLoginUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [error, setError] = useState('');
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const handleInputChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignIn((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Signing in:', signIn);
    mutationLogin.mutate(
      { email: signIn.email, password: signIn.password },
      {
        onSuccess: async (data) => {
          console.log('User logged in:', data);

          await queryClient.invalidateQueries({ queryKey: ['session'] });

          navigate('/dashboard');
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
          setError(error.response.data.message);
        },
      },
    );
  };

  return (
    <form className="w-full flex-col flex" onSubmit={handleSubmit}>
      <Input className="mb-2" type="email" name="email" placeholder="Email" value={signIn.email} onChange={handleInputChangeSignIn} required />
      <Input
        className="mb-2"
        type="password"
        placeholder="Password"
        name="password"
        value={signIn.password}
        onChange={handleInputChangeSignIn}
        required
      />
      <Button className="mt-[2rem] cursor-pointer" type="submit" disabled={mutationLogin.isPending}>
        {mutationLogin.isPending ? 'Logging in...' : 'Login'}
      </Button>

      {error && <p className="text-sm text-red-500 my-2">{error}</p>}
    </form>
  );
};

export default LoginForm;
