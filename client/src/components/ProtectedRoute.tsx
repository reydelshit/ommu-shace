import { useSession } from '@/hooks/useSession';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useSession();
  console.log('ProtectedRoute - User:', user);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
