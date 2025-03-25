import { User } from '@/utils/getSession';
import axiosInstance from './axiosInstance';

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

// Service function for updating profile
export const updateProfile = async (updateData: FormData): Promise<UpdateProfileResponse> => {
  const response = await axiosInstance.put('/users/update', updateData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
