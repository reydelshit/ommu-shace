import { useSession } from '@/hooks/useSession';

const Dashboard = () => {
  const { user, session } = useSession();

  if (!session) return <p>Access Denied</p>;

  return <h1>Welcome, {user?.email}!</h1>;
};

export default Dashboard;
