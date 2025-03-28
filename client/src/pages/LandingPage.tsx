import FormContainer from '@/components/FormContainer';
import { Button } from '@/components/ui/button';
import { useLoginModalStore } from '@/store/useLoginModalStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const { showLoginModal, setShowLoginModal } = useLoginModalStore();

  // Animation variants for the icons
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-start justify-center relative py-20 mb-[8rem]">
      <div className="max-w-5xl">
        <motion.h1 initial="hidden" animate="visible" variants={textVariants} className="mb-6 text-8xl font-bold leading-tight tracking-tight ">
          Connect Through What You Love
        </motion.h1>

        <motion.p initial="hidden" animate="visible" variants={textVariants} className="mb-8 text-lg md:text-xl">
          Your interests connect you to a community. Whether you&apos;re into gaming, music, art, fitness, tech, or environmental action, there&apos;s
          a space for you here.
        </motion.p>

        <motion.div initial="hidden" animate="visible" className="mb-10 overflow-hidden rounded-md p-4 md:p-6">
          <div className="flex items-center justify-between space-x-4">
            <>
              <motion.div custom={0} variants={iconVariants} className="flex-1">
                <SpiralIcon />
              </motion.div>
              <motion.div custom={1} variants={iconVariants} className="flex-1">
                <HeartIcon />
              </motion.div>
              <motion.div custom={2} variants={iconVariants} className="flex-1">
                <SplatIcon />
              </motion.div>
              <motion.div custom={3} variants={iconVariants} className="flex-1">
                <StarburstIcon />
              </motion.div>
              <motion.div custom={4} variants={iconVariants} className="flex-1">
                <FlowerIcon />
              </motion.div>
            </>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" whileHover="hover" variants={buttonVariants}>
          <Button
            onClick={() => setShowLoginModal(true)}
            className="inline-flex items-center rounded-md h-18 w-36 cursor-pointer bg-black px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-black/90"
          >
            Let&apos;s go
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <FormContainer setShowLoginModal={setShowLoginModal} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
// Icon Components
function SpiralIcon() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-36 w-36 "
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
    >
      <path
        d="M50,90c-22.1,0-40-17.9-40-40s17.9-40,40-40s40,17.9,40,40S72.1,90,50,90z M50,20c-16.5,0-30,13.5-30,30s13.5,30,30,30s30-13.5,30-30S66.5,20,50,20z M50,70c-11,0-20-9-20-20s9-20,20-20s20,9,20,20S61,70,50,70z M50,40c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S55.5,40,50,40z M50,55c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S52.8,55,50,55z"
        fill="#FFA726"
      />
    </motion.svg>
  );
}

function HeartIcon() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-36 w-36 "
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
    >
      <path
        d="M50,90c-1.9,0-3.8-0.7-5.3-2.1C39.4,83,15,61.2,15,40c0-13.8,11.2-25,25-25c6.9,0,13.4,2.7,18.3,7.6L50,14.3l-8.3-7.6C46.6,2.7,53.1,0,60,0c13.8,0,25,11.2,25,25c0,21.2-24.4,43-29.7,47.9C53.8,89.3,51.9,90,50,90z"
        fill="#FF7043"
      />
    </motion.svg>
  );
}

function SplatIcon() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-36 w-36 "
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
    >
      <path
        d="M50,10c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C60,14.5,55.5,10,50,10z M20,40c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C30,44.5,25.5,40,20,40z M50,40c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C60,44.5,55.5,40,50,40z M80,40c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C90,44.5,85.5,40,80,40z M50,70c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C60,74.5,55.5,70,50,70z"
        fill="#4285F4"
      />
    </motion.svg>
  );
}

function StarburstIcon() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-36 w-36 "
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
    >
      <path
        d="M50,0L50,0v20l7.7-18.5L50,20l15-12.9L50,20l20-5.3L50,20l22.1,3.7L50,20l21.2,12.3L50,20l17.4,19.5L50,20v30l7.7-28.5L50,50l15-22.9L50,50l20-15.3L50,50l22.1-6.3L50,50l21.2,2.3L50,50l17.4,9.5L50,50v30l7.7-28.5L50,80l15-22.9L50,80l20-15.3L50,80l22.1-6.3L50,80l21.2,2.3L50,80l17.4,9.5L50,80v20l7.7-18.5L50,100l15-12.9L50,100l20-5.3L50,100l22.1,3.7L50,100l21.2,12.3L50,100l17.4,19.5L50,100H30l18.5-7.7L30,100l12.9-15L30,100l5.3-20L30,100l-3.7-22.1L30,100L17.7,78.8L30,100L10.5,82.6L30,100H0l18.5-7.7L0,100l12.9-15L0,100l5.3-20L0,100l-3.7-22.1L0,100L-12.3,78.8L0,100L-19.5,82.6L0,100V70l-7.7,28.5L0,70l-15,22.9L0,70l-20,15.3L0,70l-22.1,6.3L0,70l-21.2-2.3L0,70l-17.4-9.5L0,70V40l-7.7,28.5L0,40l-15,22.9L0,40l-20,15.3L0,40l-22.1,6.3L0,40l-21.2-2.3L0,40l-17.4-9.5L0,40V20L-7.7,38.5L0,20l-15,12.9L0,20l-20,5.3L0,20l-22.1-3.7L0,20l-21.2-12.3L0,20L-17.4,0.5L0,20h20L1.5,27.7L20,20L7.1,35L20,20l-5.3,20L20,20l3.7,22.1L20,20l12.3,21.2L20,20L39.5,2.6L20,20h30L31.5,27.7L50,20L37.1,35L50,20l-5.3,20L50,20l3.7,22.1L50,20l12.3,21.2L50,20L69.5,2.6L50,20"
        fill="#26A69A"
      />
    </motion.svg>
  );
}

function FlowerIcon() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-36 w-36 "
      animate={{
        y: [0, -5, 0],
        rotate: [0, 5, 0],
      }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
    >
      <g>
        <circle cx="70" cy="30" r="15" fill="#FFC107" />
        <circle cx="70" cy="30" r="7" fill="#212121" />
        <path d="M50,40c0,0-10,30-10,40s10,20,20,20s20-10,20-20S50,40,50,40z" fill="#66BB6A" />
      </g>
    </motion.svg>
  );
}
