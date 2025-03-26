import { X } from 'lucide-react';
import { useState } from 'react';
import LoginForm from './forms/LoginForm';
import Registration from './forms/Registration';

type FormContainerProps = {
  setShowLoginModal?: (value: boolean) => void;
};

const FormContainer = ({ setShowLoginModal }: FormContainerProps) => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-4xl shadow-lg z-20 ${
        isCreateAccount ? 'w-[800px] h-[450px]' : 'w-[400px] h-[380px]'
      }  text-start`}
    >
      <div className="self-end w-full flex justify-end ">
        <X onClick={() => setShowLoginModal && setShowLoginModal(false)} className="cursor-pointer " />
      </div>
      <h1 className="text-xl mb-4">
        Welcome to <span className="font-semibold ">OMMU</span>
      </h1>

      {!isCreateAccount ? (
        <p className="text-sm mb-4">Please sign in to your account to continue. </p>
      ) : (
        <p className="text-sm mb-4">Please fill in the form below to create an account. </p>
      )}

      {!isCreateAccount ? <LoginForm /> : <Registration setIsCreateAccount={setIsCreateAccount} />}
      {!isCreateAccount && (
        <p className="text-sm text-center my-2">
          Don't have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => setIsCreateAccount(true)}>
            Create Account
          </span>
        </p>
      )}
    </div>
  );
};

export default FormContainer;
