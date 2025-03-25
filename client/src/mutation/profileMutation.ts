// import { updateProfile } from '@/api/serviceUser';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// const queryClient = useQueryClient();

// const updateProfileMutation = useMutation(updateProfile, {
//   onSuccess: (data) => {
//     // Invalidate and refetch the session query
//     queryClient.invalidateQueries('session');

//     // Show success message
//     alert('Profile updated successfully');

//     // Reset password fields
//     setNewPassword({
//       password: '',
//       confirmPassword: '',
//     });
//   },
//   onError: (error: any) => {
//     // Handle error
//     console.error('Error updating profile:', error);
//     alert(error.response?.data?.message || 'An error occurred while updating your profile');
//   },
// });
