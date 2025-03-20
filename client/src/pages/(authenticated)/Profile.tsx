import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const dummyUserProfile = {
  fullname: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '123-456-7890',
  address: '1234 Elm St, Springfield, IL 62701',
  createdAt: '2023-05-12',
  profilePicture: '/api/placeholder/128/128',
  coverPicture: '/api/placeholder/1024/256',
  gender: 'Male',
  birthday: '1995-08-24',
  bio: 'Tech enthusiast, gamer, and coffee addict. Always exploring new ideas!',
  username: 'alexj95',
  verified: true,
  interest: ['Technology', 'Gaming', 'Coffee'],
  verifiedDate: '2023-06-15',
};

export default function Profile() {
  return (
    <div className="relative w-[95%] max-w-full mx-auto shadow-lg bg-white rounded-lg">
      <div className="relative h-52 w-full rounded-t-lg overflow-hidden bg-black">
        <img src="/background-placeholder.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
      </div>
      <div className="flex flex-col items-center">
        <Avatar className="border-4 h-[250px] w-[250px] -mt-30 bg-white border-white">
          <AvatarImage src="/avatar-placeholder.jpg" alt="Emma Roberts" />
        </Avatar>
        <h2 className="text-lg font-semibold mt-2">Emma Roberts</h2>
        <p className="text-sm text-gray-500">UI/UX Designer @Company</p>
      </div>

      <div className="px-4">dsad</div>
    </div>
  );
}
