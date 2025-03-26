import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useGetAllEventsWithoutPagination } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { EventsWithAttendees } from '@/types/events';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMemo } from 'react';

import DefaultCover from '@/assets/defaultCover.avif';
import { DefaultProfile } from '@/utils/defaultImages';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileJoinedEvents from './components/profile/ProfileJoinedEvents';
import ProfileYourCreatedEvents from './components/profile/ProfileYourCreatedEvents';
import { imageMap, ProjectCategory } from '@/lib/badges';

// const categoryMapping: Record<string, ProjectCategory> = {
//   'Civic Engagement and Responsibility': ProjectCategory.CIVIC_ENGAGEMENT_RESPONSIBILITY,
//   'Collaboration and Engagement': ProjectCategory.COLLABORATION_ENGAGEMENT,
//   'Economic Stability': ProjectCategory.ECONOMIC_STABILITY,
//   'Education and Empowerment': ProjectCategory.EDUCATION_EMPOWERMENT,
//   'Health and Well-being': ProjectCategory.HEALTH_WELLBEING,
//   'Inclusivity and Diversity': ProjectCategory.INCLUSIVITY_DIVERSITY,
//   'Social Connection and Support': ProjectCategory.SOCIAL_CONNECTION_SUPPORT,
//   'Sustainability and Environmental Responsibility': ProjectCategory.SUSTAINABILITY_ENVIRONMENT,
//   'Trust and Transparency': ProjectCategory.TRUST_TRANSPARENCY,
// };

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

  const getUserBadgeImages = (topCategories: { category: string; totalPoints: number }[]) => {
    return topCategories.map(({ category }) => imageMap[category]);
  };
  // Example usage:
  const userBadges = user ? getUserBadgeImages(user.topCategories) : [];

  return (
    <div className="relative w-[95%] h-fit max-w-full mx-auto shadow-lg bg-white rounded-lg overflow-hidden mb-[8rem] h-fit-content pb-8">
      <div className="relative h-52 w-full rounded-t-lg overflow-hidden bg-black">
        <img
          src={user?.coverPicture && user.coverPicture.trim() !== '' ? `${import.meta.env.VITE_BACKEND_URL}${user.coverPicture}` : DefaultCover}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />

        {userBadges.map((image, index) => (
          <img key={index} src={image} alt="Badge" className="absolute w-16 bottom-4 left-[18rem]" />
        ))}

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

        {joinedEvents.length > 0 ? (
          <ProfileJoinedEvents joinedEvents={joinedEvents} />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">No joined events yet</p>
          </div>
        )}
      </div>

      <div className="px-4 mt-4 w-full">
        <h1 className="my-4">Projects and Events | Created Events</h1>

        <Separator />

        {yourCreatedEvents.length > 0 ? (
          <ProfileYourCreatedEvents yourCreatedEvents={yourCreatedEvents} />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">No created events yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
