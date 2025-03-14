import { AuthProvider } from '@/context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
// import RegisterForm from './components/RegisterForm';
import { Toaster } from 'sonner';

import MainComponent from './pages/MainComponent';

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
