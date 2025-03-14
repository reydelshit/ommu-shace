import { AuthProvider } from '@/context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';

import MainComponent from './pages/MainComponent';

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
