import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSession } from '@/hooks/useSession';
import { badges } from '@/lib/badges';
import { BaseEvent } from '@/types/events';
import { DefaultProfile } from '@/utils/defaultImages';
import { randomColor } from '@/utils/randomColor';
import { LatLngTuple } from 'leaflet';
import { Calendar, MapPin, User2Icon, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ DEFAULT_CENTER, event }: { DEFAULT_CENTER: LatLngTuple; event: BaseEvent }) => {
  const { user } = useSession();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  type Coordinates = { lat: number; lon: number };

  const haversineDistance = (point1: Coordinates, point2: Coordinates) => {
    const toRad = (angle: number) => (angle * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(point2.lat - point1.lat);
    const dLon = toRad(point2.lon - point1.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };
  const parseLatLng = (location: string): [number, number] => {
    const [lat, lon] = location.split(',').map(Number);
    return [lat, lon];
  };

  return (
    <Link className="h-full" to={`/event/${event.id}`}>
      <div className="rounded-xl h-full overflow-hidden shadow-md z-20 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform ">
        <div
          className="p-4 shadow-md text-white relative h-52"
          style={{
            background:
              event.bannerPath && event.bannerPath !== 'null'
                ? `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath}) center/cover no-repeat`
                : `linear-gradient(135deg, ${randomColor}, #6A5ACD)`,
          }}
        >
          <div className="relative z-0">
            <h2 className="text-xl font-bold mb-3">{event.eventName}</h2>

            <div className="flex items-center gap-2">
              <Avatar className=" h-8 w-8  object-cover  bg-white border-white cursor-pointer">
                <AvatarImage
                  src={
                    event?.user.profilePicture && event?.user.profilePicture.trim() !== ''
                      ? `${import.meta.env.VITE_BACKEND_URL}${event?.user.profilePicture}`
                      : DefaultProfile
                  }
                  alt="profile"
                  className="object-cover"
                />
              </Avatar>

              <p className="bg-green-400 w-fit my-2 rounded-2xl p-2 text-xs">{event.user.id === user?.id ? 'You' : event.user.fullname}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium">Join</button>
              <span className="text-xs bg-yellow-text text-black px-2 py-1 rounded-md">
                {haversineDistance(
                  { lat: DEFAULT_CENTER[0], lon: DEFAULT_CENTER[1] },
                  {
                    lat: parseLatLng(event.markedLocation)[0],
                    lon: parseLatLng(event.markedLocation)[1],
                  },
                ).toFixed(2)}{' '}
                km away
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white w-full h-full p-4">
          <div className="flex justify-between w-full items-center ">
            <div className="flex gap-3 w-full">
              {/* Calendar icon */}
              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <Calendar className="w-[24px] h-[24px] text-gray-600" />
              </div>

              <div className="w-full">
                <h3 className="font-medium">Details</h3>
                <div className="text-xs text-gray-500">
                  {formatDate(event.startDate)} - {formatDate(event.endDate).split(',')[1]}
                </div>
                <div className="text-xs mt-1 line-clamp-2 break-words whitespace-pre-wrap w-[258px]">{event.description.slice(0, 60)}</div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-xs font-medium mb-4 flex items-center gap-2">
                <User2Icon className="h-4 w-4" /> {event?.attendees.filter((attend) => attend.status === 'APPROVED').length} / {event?.capacity}{' '}
                attendees
              </p>
            </div>
          </div>

          {/* Location info if available */}
          {event.location && (
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <MapPin size={14} className="mr-1" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          <div className="flex gap-4 my-4">
            {event.tags
              .split(',')
              .map((tag: string) => badges.find((badge) => badge.name === tag))
              .filter(Boolean)
              .map(
                (badge, index) =>
                  badge && (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <img src={badge.image} alt={badge.name} className="w-6 h-6" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{badge.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ),
              )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EventCard;
