import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser, useRegisterUser } from '../hooks/useUserAuth';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';

const FormContainer = ({
  setShowLoginModal,
}: {
  setShowLoginModal: (value: boolean) => void;
}) => {
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

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
  const [error, setError] = useState('');
  const [errorSignUp, setErrorSignUp] = useState('');
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  const mutationLogin = useLoginUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutationRegister = useRegisterUser();

  const handleInputChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignIn((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          setError(error.message);
        },
      },
    );
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
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-4xl shadow-lg z-20 ${
        isCreateAccount ? 'w-[800px] h-[450px]' : 'w-[400px] h-[380px]'
      }  text-start`}
    >
      <div className="self-end w-full flex justify-end ">
        <X
          onClick={() => setShowLoginModal(false)}
          className="cursor-pointer "
        />
      </div>
      <h1 className="text-xl mb-4">
        Welcome to <span className="font-semibold ">OMMU</span>
      </h1>

      {!isCreateAccount ? (
        <p className="text-sm mb-4">
          Please sign in to your account to continue.{' '}
        </p>
      ) : (
        <p className="text-sm mb-4">
          Please fill in the form below to create an account.{' '}
        </p>
      )}

      {!isCreateAccount ? (
        <form className="w-full flex-col flex" onSubmit={handleSubmit}>
          <Input
            className="mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={signIn.email}
            onChange={handleInputChangeSignIn}
            required
          />
          <Input
            className="mb-2"
            type="password"
            placeholder="Password"
            name="password"
            value={signIn.password}
            onChange={handleInputChangeSignIn}
            required
          />
          <Button
            className="mt-[2rem] cursor-pointer"
            type="submit"
            disabled={mutationLogin.isPending}
          >
            {mutationLogin.isPending ? 'Logging in...' : 'Login'}
          </Button>

          {error && <p className="text-sm text-red-500 my-2">{error}</p>}
        </form>
      ) : (
        <form onSubmit={handleSubmitRegister}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={signUp.username}
              onChange={handleInputChangeSignUp}
              required
            />

            <Input
              type="text"
              name="fullname"
              placeholder="Fullname"
              value={signUp.fullname}
              onChange={handleInputChangeSignUp}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={signUp.email}
              onChange={handleInputChangeSignUp}
              required
            />
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={signUp.phoneNumber}
              onChange={handleInputChangeSignUp}
              required
            />

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
              className={`${
                signUp.error
                  ? 'border-red-500 outline-red-500 selection:border-red-500 active:border-red-500 focus:border-red-500'
                  : ''
              }`}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signUp.confirmPassword}
              onChange={handleInputChangeSignUp}
              required
            />

            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={signUp.address}
              onChange={handleInputChangeSignUp}
              required
            />

            {signUp.error && <p className="text-red-500">{signUp.error}</p>}

            <Input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={signUp.birthday}
              onChange={handleInputChangeSignUp}
              required
            />
          </div>
          {errorSignUp && <p className="text-red-500">{errorSignUp}</p>}

          <div className="w-full mt-4 flex justify-between items-center">
            <p className="text-sm">
              Already have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsCreateAccount(false)}
              >
                Sign In
              </span>
            </p>

            <Button
              className="w-[200px] cursor-pointer"
              type="submit"
              disabled={mutationRegister.isPending}
            >
              {mutationRegister.isPending ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      )}
      {!isCreateAccount && (
        <p className="text-sm text-center my-2">
          Don't have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsCreateAccount(true)}
          >
            Create Account
          </span>
        </p>
      )}
    </div>
  );
};

export default FormContainer;
