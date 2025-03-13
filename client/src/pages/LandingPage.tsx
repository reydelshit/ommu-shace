import ANT from '@/assets/ANT.png';
import FormContainer from '@/components/FormContainer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="w-full relative h-[700px] text-center items-center justify-center flex flex-col">
      <img
        src={ANT}
        alt="ANT_BG"
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[45%] mt-[3rem] z-0"
      />

      <div className="w-full z-10">
        <h1 className="text-9xl text-yellow-text  font-display">
          WHAT’S UP WITH THE MATRIX?
        </h1>

        <p className="text-yellow-text mt-[2rem] text-2xl">
          Build. Support. Thrive.
        </p>
        <p className="text-xl text-yellow-text">
          Be part of the c<span className="font-bold text-black">ommu</span>
          nity
        </p>

        <Button
          onClick={() => setShowLoginModal(true)}
          className="mt-[1rem] cursor-pointer"
        >
          Join the Community
        </Button>
      </div>

      {showLoginModal && (
        <FormContainer setShowLoginModal={setShowLoginModal} />
      )}
    </div>
  );
};

export default LandingPage;
