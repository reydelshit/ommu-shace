import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { badges } from '@/lib/badges';
import { EventType } from '@/types/events';
import { LatLngTuple } from 'leaflet';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const randomColors = [
  'bg-blue-500',
  'bg-green-600',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500',
];

export const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

const YourEventsViewCard = ({ DEFAULT_CENTER, event }: { DEFAULT_CENTER: LatLngTuple; event: EventType }) => {
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
    <Link className="h-full" to={`/your-event/${event.id}`}>
      <div className="rounded-xl h-full overflow-hidden shadow-md -z-20 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform">
        <div
          className={`p-4 shadow-2xl text-white relative h-52 ${event.bannerPath && event.bannerPath !== 'null' ? 'bg-brown-text' : randomColor}`}
          style={
            event.bannerPath && event.bannerPath !== 'null'
              ? {
                  backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <div className="relative z-0">
            <h2 className="text-xl font-bold mb-3">{event.eventName}</h2>

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

        <div className="bg-white h-full p-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              {/* Calendar icon */}
              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <Calendar size={20} className="text-gray-600" />
              </div>

              <div>
                <h3 className="font-medium">Details</h3>
                <div className="text-xs text-gray-500">
                  {formatDate(event.startDate)} - {formatDate(event.endDate).split(',')[1]}
                </div>
                <div className="text-xs mt-1 line-clamp-2 break-words whitespace-pre-wrap w-[80%]">{event.description}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                <Users size={14} className="text-gray-500 mr-1" />
                <span className="text-xs font-medium">{event.capacity}</span>
              </div>
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
export default YourEventsViewCard;
