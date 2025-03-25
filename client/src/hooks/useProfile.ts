import { updateProfile } from '@/api/serviceUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
