import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import LoginForm from './forms/LoginForm';
import Registration from './forms/Registration';

type FormContainerProps = {
  setShowLoginModal?: (value: boolean) => void;
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: '-50%',
    x: '-50%',
    top: '50%',
    left: '50%',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: '-50%',
    x: '-50%',
    top: '50%',
    left: '50%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

const FormContainer = ({ setShowLoginModal }: FormContainerProps) => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modalVariants}
      className={`absolute  bg-white p-8 rounded-4xl  shadow-lg z-20 ${isCreateAccount ? 'w-[800px] h-[450px]' : 'w-[400px] h-[380px]'}  text-start`}
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
    </motion.div>
  );
};

export default FormContainer;
