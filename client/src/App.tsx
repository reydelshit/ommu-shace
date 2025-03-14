import { AuthProvider } from '@/context/AuthProvider';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
// import RegisterForm from './components/RegisterForm';
import { Toaster } from 'sonner';
import EventFormContainer from './components/EventFormContainer';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './pages/(authenticated)/Dashboard';
import ViewEvent from './pages/(authenticated)/ViewEvent';
import LandingPage from './pages/LandingPage';

import { useSession } from '@/hooks/useSession';
import { CirclePlus, Minimize, TicketPercent, User, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainComponent />
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

const MainComponent = () => {
  // const { user, session } = useSession();
  const [showOptions, setShowOptions] = useState(false);

  const path = useLocation().pathname;

  return (
    <div className="bg-brown-text min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-col items-start justify-between min-h-screen relative">
        <Header />

        <div className="w-full flex flex-row">
          {path !== '/' && (
            <div className="flex flex-col border-yellow-500 items-center justify-center bg-[#F3F3F3] p-4 rounded-3xl w-[80px] h-[450px] gap-10 text-center z-50 sticky top-48 left-0 shadow-lg ">
              <div
                onClick={() => setShowOptions(!showOptions)}
                className="bg-yellow-text  w-full h-12 rounded-full flex items-center justify-center cursor-pointer"
              >
                {showOptions ? (
                  <Minimize size={24} />
                ) : (
                  <CirclePlus size={24} />
                )}
              </div>
              {showOptions && (
                <div className="absolute left-24 top-0 z-0 bg-white p-4 rounded-md shadow-lg w-64 animate-in slide-in-from-left duration-300">
                  <div className="flex flex-col gap-4">
                    {/* Illustration and welcome text */}
                    <div className="flex items-center gap-3 border-b pb-3">
                      <div className="bg-[#FFFDDB] rounded-full p-2 text-2xl">
                        👋🏿
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-sm">Hey! Wassup.</h4>
                        <p className="text-xs text-gray-600">
                          Create your event or campaign now!
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <Link className="w-full" to="/dashboard/create/campaign">
                      <Button className="cursor-pointer w-full bg-[#C5DEE0] text-black font-medium py-2 rounded-md text-sm hover:bg-[#A8C5C8] transition-colors focus:ring-2 focus:ring-[#C5DEE0]/50 focus:outline-none">
                        Start Campaign
                      </Button>
                    </Link>
                    <Link className="w-full" to="/dashboard/create/event">
                      <Button className="cursor-pointer w-full bg-yellow-text text-black font-medium py-2 rounded-md text-sm hover:bg-yellow-500/90 transition-colors focus:ring-2 focus:ring-yellow-text/50 focus:outline-none">
                        Create Event
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="text-center flex flex-col items-center cursor-pointer">
                <User />
                <span className="block text-[10px]">Profile</span>
              </div>

              <div className="text-center flex flex-col items-center cursor-pointer">
                <TicketPercent />
                <span className="block text-[10px]">Your Events</span>
              </div>

              <div className="text-center flex flex-col items-center cursor-pointer">
                <Users />
                <span className="block text-[10px]">Community</span>
              </div>
            </div>
          )}

          <main className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/create/event"
                  element={<EventFormContainer />}
                />
              </Route>

              <Route path="/event/:eventId" element={<ViewEvent />} />

              <Route
                path="/*"
                element={
                  <div className="flex w-full justify-center items-center h-full">
                    <h1 className="text-4xl">404 - Not Found</h1>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
