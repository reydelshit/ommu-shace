import { EventType } from '@/types/events';
import { LatLngTuple } from 'leaflet';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({
  DEFAULT_CENTER,
  event,
}: {
  DEFAULT_CENTER: LatLngTuple;
  event: EventType;
}) => {
  const randomColors = [
    'bg-blue-500',
    'bg-green-600',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500',
  ];

  const randomColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];

  // Format date function
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
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(point1.lat)) *
        Math.cos(toRad(point2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };
  const parseLatLng = (location: string): [number, number] => {
    const [lat, lon] = location.split(',').map(Number);
    return [lat, lon];
  };

  return (
    <Link to={`/event/${event.id}`}>
      <div className="rounded-xl overflow-hidden mb-4 shadow-md -z-20 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform">
        {/* Header with title and join button */}
        <div
          className={`p-4 shadow-2xl text-white relative h-40 ${
            event.bannerPath && event.bannerPath !== 'null'
              ? 'bg-brown-text'
              : randomColor
          }`}
          style={
            event.bannerPath && event.bannerPath !== 'null'
              ? {
                  backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}${
                    event.bannerPath
                  })`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-3">{event.eventName}</h2>

            <div className="flex items-center gap-2">
              <button className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium">
                Join
              </button>
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

        <div className="bg-white p-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              {/* Calendar icon */}
              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <Calendar size={20} className="text-gray-600" />
              </div>

              <div>
                <h3 className="font-medium">Details</h3>
                <div className="text-xs text-gray-500">
                  {formatDate(event.startDate)} -{' '}
                  {formatDate(event.endDate).split(',')[1]}
                </div>
                <div className="text-xs mt-1 line-clamp-2 break-words whitespace-pre-wrap w-[400px]">
                  {event.description.slice(0, 100)}
                </div>
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

          {/* Tags if available */}
          {event.tags && (
            <div className="mt-2 flex gap-2">
              {event.tags.split(',').map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-xs px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
export default EventCard;
