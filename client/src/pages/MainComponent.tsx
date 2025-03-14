import { useLocation } from 'react-router-dom';

// import RegisterForm from './components/RegisterForm';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RoutesContainer from '@/components/Routes';
import Sidebar from '@/components/Sidebar';

const MainComponent = () => {
  const path = useLocation().pathname;

  return (
    <div className="bg-brown-text w-full flex flex-col items-center ">
      <div className="w-full max-w-[1100px] flex flex-col items-start justify-between min-h-screen relative">
        <Header />

        <div className="flex-1 flex flex-row w-full mt-8">
          {path !== '/' && <Sidebar />}

          <main className={`flex-1 ${path !== '/' ? 'ml-6' : ''}`}>
            <RoutesContainer />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainComponent;
