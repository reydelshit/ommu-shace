import DefaultProfile from '@/assets/defaultProfile.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useGetAllEventsWithoutPagination } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { EventsWithAttendees } from '@/types/events';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMemo } from 'react';

import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import DefaultCover from '@/assets/defaultCover.avif';
import { randomColor } from '@/utils/randomColor';

export default function Profile() {
  const { data } = useGetAllEventsWithoutPagination();
  const { user } = useSession();

  // const userData sa params makuha if e view ang user

  const events = data?.events || [];

  console.log('events', events);

  const joinedEvents: EventsWithAttendees[] = useMemo(() => {
    if (!user?.id) return [];
    return (events as EventsWithAttendees[]).filter((event) => event.attendees.some((attendee) => attendee.userId === user.id));
  }, [events, user?.id]);

  const yourCreatedEvents = useMemo(() => {
    if (!user?.id) return [];
    return (events as EventsWithAttendees[]).filter((event) => event.userId === user.id);
  }, [events, user?.id]);

  console.log('joinedvebts', joinedEvents);

  return (
    <div className="relative w-[95%] h-fit max-w-full mx-auto shadow-lg bg-white rounded-lg overflow-hidden mb-[8rem] h-fit-content pb-8">
      <div className="relative h-52 w-full rounded-t-lg overflow-hidden bg-black">
        <img
          src={user?.coverPicture && user.coverPicture.trim() !== '' ? `${import.meta.env.VITE_BACKEND_URL}${user.coverPicture}` : DefaultCover}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />

        <Link to="/profile/settings" className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-colors">
          <Settings className="w-6 h-6" />
        </Link>
      </div>
      <div className=" flex items-start px-8">
        <Avatar className=" h-[250px] w-[250px] object-cover -mt-30 bg-white border-white">
          <AvatarImage
            src={
              user?.profilePicture && user.profilePicture.trim() !== '' ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}` : DefaultProfile
            }
            alt="Emma Roberts"
            className="object-cover"
          />
        </Avatar>
        <div className="mx-4 flex justify-between w-full items-center">
          <div>
            <h2 className="text-2xl font-semibold mt-2">{user?.fullname}</h2>
            <p className="text-sm text-gray-500">@{user?.username}</p>
            <p className="text-sm text-gray-500">
              Based in
              <span className="text-black font-bold"> {user?.address}</span>
            </p>

            <p>{user?.bio}</p>
          </div>

          <div className="flex justify-between  p-4 space-x-4">
            <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 py-3 px-4 rounded-md">
              <span className="text-xs text-gray-500 mb-1 text-center">Followers</span>
              <span className="text-xl font-bold text-gray-800">1,500</span>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 py-3 px-4 rounded-md">
              <span className="text-xs text-gray-500 mb-1 text-center">Following</span>
              <span className="text-xl font-bold text-gray-800">1,500</span>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 py-3 px-4 rounded-md">
              <span className="text-xs text-gray-500 mb-1 text-center">Total Support</span>
              <span className="text-xl font-bold text-gray-800">1,500</span>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 py-3 px-4 rounded-md">
              <span className="text-xs text-gray-500 mb-1 text-center">Attended Events</span>
              <span className="text-xl font-bold text-gray-800">{joinedEvents.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 w-full">
        <h1 className="my-4">Projects and Events | Joined Events</h1>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {joinedEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id} className="group relative">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                {/* Event Banner */}
                <div
                  className="h-40 w-full bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      event.bannerPath && event.bannerPath !== 'null'
                        ? `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})`
                        : `linear-gradient(135deg, ${randomColor}, #6A5ACD)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3">
                  <h2 className="text-xl font-bold text-gray-800 truncate">{event.eventName}</h2>

                  <p className="text-sm text-gray-600 line-clamp-2 h-12">
                    {event.description.slice(0, 100)}
                    {event.description.length > 100 ? '...' : ''}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs text-gray-500">
                        {/* You can add event date here if available */}
                        Joined Event
                      </span>
                    </div>

                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 w-full">
        <h1 className="my-4">Projects and Events | Created Events</h1>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {yourCreatedEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id} className="group relative">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                {/* Event Banner */}
                <div
                  className="h-40 w-full bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      event.bannerPath && event.bannerPath !== 'null'
                        ? `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})`
                        : `linear-gradient(135deg, ${randomColor}, #6A5ACD)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3">
                  <h2 className="text-xl font-bold text-gray-800 truncate">{event.eventName}</h2>

                  <p className="text-sm text-gray-600 line-clamp-2 h-12">
                    {event.description.slice(0, 100)}
                    {event.description.length > 100 ? '...' : ''}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs text-gray-500">
                        {/* You can add event date here if available */}
                        Joined Event
                      </span>
                    </div>

                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
