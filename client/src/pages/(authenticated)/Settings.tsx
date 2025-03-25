import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileUpdate } from '@/hooks/useProfile';
import { useSession } from '@/hooks/useSession';
import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface UserFormData {
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
}

function Settings() {
  const { user } = useSession();

  const updateProfileMutation = useProfileUpdate();

  const [formData, setFormData] = useState<UserFormData>({
    id: user?.id || '',
    fullname: user?.fullname || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePicture: user?.profilePicture || null,
    coverPicture: user?.coverPicture || null,
    bio: user?.bio || '',
    interests: user?.interests || '',
    verifiedDate: user?.verifiedDate || null,
    verifiedBy: user?.verifiedBy || null,
    verifiedStatus: user?.verifiedStatus || null,
    password: '',
    address: user?.address || '',
    role: user?.role || 'user',
    birthday: user?.birthday || '',
  });

  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        bio: user.bio,
        interests: user.interests,
        verifiedDate: user.verifiedDate,
        verifiedBy: user.verifiedBy,
        verifiedStatus: user.verifiedStatus,
        address: user.address,
        role: user.role,
        birthday: user.birthday,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (type: 'profile' | 'cover', file: File) => {
    setFormData((prev) => ({
      ...prev,
      [type === 'profile' ? 'profilePicture' : 'coverPicture']: file, // Store File, not Base64
    }));
  };

  const handleSaveChanges = () => {
    if (newPassword.password && newPassword.password !== newPassword.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const formDataToSend = new FormData(); // Use a new instance

    formDataToSend.append('id', formData.id);
    formDataToSend.append('fullname', formData.fullname);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('interests', formData.interests);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('birthday', formData.birthday);

    // Append images if selected
    if (formData.profilePicture && typeof formData.profilePicture !== 'string') {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }
    if (formData.coverPicture && typeof formData.coverPicture !== 'string') {
      formDataToSend.append('coverPicture', formData.coverPicture);
    }

    if (newPassword.password) {
      formDataToSend.append('password', newPassword.password);
    }

    updateProfileMutation.mutate(formDataToSend, {
      onSuccess: () => {
        toast.success('Profile updated successfully');
        setNewPassword({ password: '', confirmPassword: '' });
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to update profile');
      },
    });
  };

  return (
    <div className="relative w-[95%] max-w-full mx-auto shadow-lg bg-white rounded-lg overflow-hidden mb-[8rem] h-fit-content pb-8">
      {/* Cover Picture Upload */}
      <div className="relative h-64 bg-black z-10">
        {formData.coverPicture && (
          <img
            src={
              formData.coverPicture && typeof formData.coverPicture !== 'string'
                ? URL.createObjectURL(formData.coverPicture)
                : `${import.meta.env.VITE_BACKEND_URL}${formData.coverPicture}` || undefined
            }
            alt="Cover"
            className="w-full h-full object-cover absolute z-0"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="cover-upload"
          onChange={(e) => e.target.files && handleFileUpload('cover', e.target.files[0])}
        />
        <label htmlFor="cover-upload" className="absolute top-4 right-4 bg-white/50 hover:bg-white/70 rounded-full p-2 cursor-pointer z-10">
          <Camera className="w-6 h-6 text-white " />
        </label>
      </div>

      {/* Profile Section */}
      <div className="w-full mx-auto px-4 relative z-20">
        <div className="flex items-center w-full justify-center space-x-4 mt-[-8rem]">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-upload"
              onChange={(e) => e.target.files && handleFileUpload('profile', e.target.files[0])}
            />
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white/50 hover:bg-white/70 rounded-full p-1 cursor-pointer">
              <Camera className="w-4 h-4" />
            </label>
            {formData.profilePicture ? (
              <img
                src={
                  formData.profilePicture && typeof formData.profilePicture !== 'string'
                    ? URL.createObjectURL(formData.profilePicture)
                    : `${import.meta.env.VITE_BACKEND_URL}${formData.profilePicture}` || undefined
                }
                alt="Profile"
                className="w-52 h-52 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-52 h-52 rounded-full border-4 border-white bg-yellow-400 flex items-center justify-center">
                <div className="text-4xl text-white">{formData.fullname.charAt(0).toUpperCase()}</div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Form */}
        <div className="space-y-6 max-w-2xl mx-auto mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="fullname" value={formData.fullname} onChange={handleInputChange} className="bg-gray-100" />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input name="username" value={formData.username} onChange={handleInputChange} className="bg-gray-100" />
            </div>
          </div>

          {/* Rest of the form remains the same as in previous implementation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} className="bg-gray-100" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="bg-gray-100" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-gray-100 min-h-[100px] text-sm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Address</Label>
              <Input name="address" value={formData.address} onChange={handleInputChange} className="bg-gray-100" />
            </div>
            <div className="space-y-2">
              <Label>Birthday</Label>
              <Input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} className="bg-gray-100" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="password"
                name="password"
                value={newPassword.password}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="bg-gray-100"
              />
              <Input
                type="password"
                name="confirmPassword"
                value={newPassword.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/profile">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button onClick={handleSaveChanges}> {updateProfileMutation.isPending ? 'Updating...' : 'Save Changes'}</Button>
          </div>
        </div>

        {updateProfileMutation.isError && <div className="error">{updateProfileMutation.error.message}</div>}
      </div>
    </div>
  );
}

export default Settings;
