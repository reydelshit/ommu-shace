import { useState } from 'react';
import { useRegisterUser } from '../hooks/useUserAuth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log('User registered:', data);
          alert('Registration successful!');
        },
        onError: (error: any) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
