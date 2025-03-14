import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRegisterUser } from '@/hooks/useUserAuth';
import { toast } from 'sonner';

const Registration = ({ setIsCreateAccount }: { setIsCreateAccount: (value: boolean) => void }) => {
  const [signUp, setSignUp] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    birthday: '',
    error: '',
  });
  const [errorSignUp, setErrorSignUp] = useState('');

  const mutationRegister = useRegisterUser();

  const handleInputChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUp((prev) => {
      const updatedSignUp = { ...prev, [name]: value };

      // Check if confirmPassword does not match password
      if (name === 'confirmPassword' && updatedSignUp.password !== value) {
        updatedSignUp.error = 'Passwords do not match!';
      } else {
        updatedSignUp.error = '';
      }

      return updatedSignUp;
    });
  };

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Registering:', signUp);
    mutationRegister.mutate(
      {
        username: signUp.username,
        fullname: signUp.fullname,
        email: signUp.email,
        password: signUp.password,
        phoneNumber: signUp.phoneNumber,
        address: signUp.address,
        birthday: signUp.birthday,
      },
      {
        onSuccess: (data) => {
          console.log('User registered:', data);
          let countdown = 5;
          const toastId = toast(`Account created successfully.`, {
            description: `You can now login to your account. Redirecting in ${countdown} seconds...`,
          });

          const interval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
              toast(`Account created successfully.`, {
                id: toastId,
                description: `You can now login to your account. Redirecting in ${countdown} seconds...`,
                action: {
                  label: 'Close',
                  onClick: () => console.log('Close'),
                },
              });
            } else {
              clearInterval(interval);
              toast.dismiss(toastId);
              setIsCreateAccount(false);
            }
          }, 1000);
        },
        onError: (error: any) => {
          if (error.response) {
            console.error('Registration failed:', error.response.data);
            setErrorSignUp(error.response.data.message);
          } else {
            console.error('Registration failed:', error.message);
          }
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmitRegister}>
      <div className="grid grid-cols-2 gap-3">
        <Input type="text" name="username" placeholder="Username" value={signUp.username} onChange={handleInputChangeSignUp} required />

        <Input type="text" name="fullname" placeholder="Fullname" value={signUp.fullname} onChange={handleInputChangeSignUp} required />

        <Input type="email" name="email" placeholder="Email" value={signUp.email} onChange={handleInputChangeSignUp} required />
        <Input type="text" name="phoneNumber" placeholder="Phone Number" value={signUp.phoneNumber} onChange={handleInputChangeSignUp} required />

        <Input
          className={`${signUp.error ? 'border-red-500' : ''}`}
          type="password"
          name="password"
          placeholder="Password"
          value={signUp.password}
          onChange={handleInputChangeSignUp}
          required
        />

        <Input
          className={`${signUp.error ? 'border-red-500 outline-red-500 selection:border-red-500 active:border-red-500 focus:border-red-500' : ''}`}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={signUp.confirmPassword}
          onChange={handleInputChangeSignUp}
          required
        />

        <Input type="text" name="address" placeholder="Address" value={signUp.address} onChange={handleInputChangeSignUp} required />

        {signUp.error && <p className="text-red-500">{signUp.error}</p>}

        <Input type="date" name="birthday" placeholder="Birthday" value={signUp.birthday} onChange={handleInputChangeSignUp} required />
      </div>
      {errorSignUp && <p className="text-red-500">{errorSignUp}</p>}

      <div className="w-full mt-4 flex justify-between items-center">
        <p className="text-sm">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => setIsCreateAccount(false)}>
            Sign In
          </span>
        </p>

        <Button className="w-[200px] cursor-pointer" type="submit" disabled={mutationRegister.isPending}>
          {mutationRegister.isPending ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};

export default Registration;
