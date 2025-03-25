import { createContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession } from '@/utils/getSession';
import axiosInstance from '@/api/axiosInstance';

type SessionType = Awaited<ReturnType<typeof getSession>>;

interface AuthContextType extends SessionType {
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    retry: false,
  });

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    queryClient.invalidateQueries({ queryKey: ['session'] });

    localStorage.removeItem('userLocation');
  };

  if (isLoading) return <p>Loading session...</p>;

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        session: data?.session ?? false,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
