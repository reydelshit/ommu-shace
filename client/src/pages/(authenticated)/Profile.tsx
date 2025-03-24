import DefaultProfile from '@/assets/defaultProfile.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useGetAllEventsWithoutPagination } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { AttendeeType, EventsWithAttendees } from '@/types/events';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMemo } from 'react';

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

  console.log('joinedvebts', joinedEvents);

  return (
    <div className="relative w-[95%] max-w-full mx-auto shadow-lg bg-white rounded-lg">
      <div className="relative h-52 w-full rounded-t-lg overflow-hidden bg-black">
        <img src="/background-placeholder.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
      </div>
      <div className=" flex items-start px-8">
        <Avatar className=" h-[250px] w-[250px] object-cover -mt-30 bg-white border-white">
          <AvatarImage src={DefaultProfile} alt="Emma Roberts" />
        </Avatar>
        <div className="mx-4 flex justify-between w-full items-center">
          <div>
            <h2 className="text-2xl font-semibold mt-2">Emma Roberts</h2>
            <p className="text-sm text-gray-500">UI/UX Designer @Company</p>
            <p className="text-sm text-gray-500">
              Based in
              <span className="text-black font-bold"> New York, USA</span>
            </p>
          </div>

          <div className="flex gap-4">
            <p className="flex flex-col text-center">
              <span>Followers</span>
              1500
            </p>

            <p className="flex flex-col text-center">
              <span>Followers</span>
              1500
            </p>

            <p className="flex flex-col text-center">
              <span>Followers</span>
              1500
            </p>

            <p className="flex flex-col text-center">
              <span>Followers</span>
              1500
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 w-full">
        <h1>Projects and Events</h1>

        <Separator />

        <div className="grid grid-cols-4 gap-4">
          {/* {userEvents.map((event) => (
            <div key={event.id} className="h-52 my-4 bg-[#A1D4F6] rounded-lg p-4">
              <div className="w-[18rem] h-[18rem]">
                <div
                  className={`p-4 shadow-2xl rounded-2xl text-white relative h-32 ${
                    event.bannerPath && event.bannerPath !== 'null' ? 'bg-brown-text' : randomColor
                  }`}
                  style={
                    event.bannerPath && event.bannerPath !== 'null'
                      ? {
                          backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : {}
                  }
                ></div>

                <h1 className="text-xl font-semibold">{event.eventName}</h1>

                <p className="text-xs">{event.description.slice(0, 50)}...</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
