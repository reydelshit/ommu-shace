import { Button } from '@/components/ui/button';
import { useGetAllEventsWithoutPagination } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { useUserLocation } from '@/hooks/useUserLocation';
import { EventsWithAttendees } from '@/types/events';
import { DefaultProfile } from '@/utils/defaultImages';
import { formatDate } from '@/utils/formatDate';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Calendar, MapPin, User2Icon } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

// Custom icons

const eventIcon = (color = 'red') =>
  L.divIcon({
    className: 'custom-event-marker',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `,
    iconSize: [30, 30], // Adjust size
    iconAnchor: [15, 30], // Center anchor
    popupAnchor: [0, -30], // Popup position
  });

const userIcon = (imagePath: string) =>
  L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        overflow: hidden; 
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
      ">
        <img src="${imagePath && imagePath.trim() !== '' ? `${import.meta.env.VITE_BACKEND_URL}${imagePath}` : DefaultProfile}" 
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" 
        />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
const MapWithMarkers = () => {
  const { user } = useSession();
  const DEFAULT_CENTER = useUserLocation();
  const { data } = useGetAllEventsWithoutPagination();
  const events: EventsWithAttendees[] = data?.events || [];

  const centerPosition =
    DEFAULT_CENTER && DEFAULT_CENTER.length === 2 ? { lat: DEFAULT_CENTER[0], lon: DEFAULT_CENTER[1] } : { lat: 6.5, lon: 125.3 };

  return (
    <MapContainer center={DEFAULT_CENTER || [0, 0]} zoom={16} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Location Marker */}
      {centerPosition && user?.profilePicture && (
        <Marker position={DEFAULT_CENTER || [0, 0]} icon={userIcon(user.profilePicture)}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {events.map((event) => {
        const [lat, lon] = event?.markedLocation.split(',').map(Number);
        return (
          <Marker key={event.id} position={[lat, lon]} icon={eventIcon('blue')}>
            <Popup>
              <div className="w-full overflow-hidden">
                {/* Event Banner */}
                {event.bannerPath && (
                  <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${event.bannerPath}`} alt="Event Banner" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Event Content */}
                <div className="p-4 space-y-4">
                  {/* Event Title and Description */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{event.eventName}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2 break-words">{event.description}</p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 text-sm">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <span className="truncate text-xs">{event.location}</span>
                    </div>

                    <div className="flex items-center text-gray-700 text-sm">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      <span className="text-xs">
                        {formatDate(event.startDate)} - {formatDate(event.endDate)}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-3"></div>

                  {/* Attendees and Action */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600 text-sm">
                      <User2Icon className="h-4 w-4 mr-2 text-gray-500" />
                      <span>
                        {event?.attendees.filter((attend) => attend.status === 'APPROVED').length} / {event?.capacity} attendees
                      </span>
                    </div>

                    <Link to={`/event/${event.id}`}>
                      <Button className="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">View Event</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWithMarkers;
