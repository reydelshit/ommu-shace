import axiosInstance from "@/api/axiosInstance";

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface SessionData {
  user: User | null;
  session: boolean;
}

export const getSession = async (): Promise<SessionData> => {
  try {
    const { data } = await axiosInstance.get<{ user: User }>("/users/me");
    return { user: data.user, session: true };
  } catch (error) {
    return { user: null, session: false };
  }
};
