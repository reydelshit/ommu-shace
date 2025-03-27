import { featuredProfiles, profiles } from '@/lib/profiles';
import { User } from 'lucide-react';

export function Changemakers() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center font-boldonse">Celebrate the Changemakers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {profiles.map((profile) => (
          <div key={profile.id} className=" text-white flex flex-col rounded-2xl overflow-hidden shadow-md cursor-pointer">
            <div className="w-full h-80  flex items-center justify-center relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <User className="w-32 h-32 text-gray-500" />
                </div>
              )}
            </div>
            <div className="bg-[#FF7043] text-white p-4 h-full">
              <h3 className="text-lg font-boldonse">{profile.name}</h3>
              <p className="text-sm">{profile.role}</p>
              {profile.description && <p className="text-xs mt-2 opacity-80 line-clamp-3">{profile.description}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-8">
        {featuredProfiles.map((profile, index) => (
          <div
            key={profile.id}
            style={{
              backgroundImage: `url(${profile.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className={`
            ${profile.color || 'bg-gray-100'} 
            border-none 
            shadow-sm 
            h-80
            grayscale hover:grayscale-0 
            transition-all duration-300 ease-in-out
            rounded-2xl
            relative
            overflow-hidden
            ${index === 2 ? 'bg-black text-white' : ''}
          `}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="font-bold text-lg text-white font-boldonse ">{profile.title}</h3>
              <p className="text-sm font-medium text-white">{profile.subtitle}</p>
              {profile.description && <p className="text-xs mt-1 opacity-80 text-white">{profile.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
