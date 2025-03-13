import { AuthProvider } from '@/context/AuthProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
// import RegisterForm from './components/RegisterForm';
import { Toaster } from 'sonner';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './pages/(authenticated)/Dashboard';
import LandingPage from './pages/LandingPage';
import EventFormContainer from './components/EventFormContainer';

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
  return (
    <div className="bg-brown-text min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-col items-start justify-between min-h-screen relative">
        <Header />
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
        <Footer />
      </div>
    </div>
  );
};
