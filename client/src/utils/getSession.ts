import axiosInstance from '@/api/axiosInstance';

export type User = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string | null;
  coverPicture?: string | null;
  bio: string;
  interests: string;
  verifiedDate?: string | null;
  verifiedBy?: string | null;
  verifiedStatus?: string | null;
  password: string;
  address: string;
  role: string;
  birthday: string;
  topCategories: { category: string; totalPoints: number }[];
};

interface SessionData {
  user: User | null;
  session: boolean;
}

export const getSession = async (): Promise<SessionData> => {
  try {
    const { data } = await axiosInstance.get<{ user: User }>('/users/me');
    return { user: data.user, session: true };
  } catch (error) {
    return { user: null, session: false };
  }
};
