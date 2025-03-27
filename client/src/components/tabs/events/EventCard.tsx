import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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

  const getEventColor = (name: string) => {
    const colors = [
      'from-rose-400 to-orange-300',
      'from-emerald-400 to-cyan-300',
      'from-violet-400 to-indigo-300',
      'from-amber-300 to-yellow-200',
      'from-pink-400 to-purple-300',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const eventColor = getEventColor(event.eventName);
  const isCreator = event.user.id === user?.id;
  const attendeeCount = event?.attendees.filter((attend) => attend.status === 'APPROVED').length;

  return (
    <Link className="block" to={`/event/${event.id}`}>
      <div className="group shadow-sm relative rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
        {/* Banner */}
        <div
          className={`relative h-56 bg-gradient-to-r ${eventColor} p-6 flex flex-col justify-between`}
          style={{
            backgroundImage: event.bannerPath && event.bannerPath !== 'null' ? `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 ring-2 ring-white/70">
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
              <Badge variant="secondary" className="font-medium text-xs">
                {isCreator ? 'You' : event.user.fullname}
              </Badge>
            </div>

            <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2">{event.eventName}</h2>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <button className="bg-white hover:bg-white/90 text-black font-medium px-4 py-2 rounded-full text-sm transition-colors">Join Event</button>

            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              {haversineDistance(
                { lat: DEFAULT_CENTER[0], lon: DEFAULT_CENTER[1] },
                { lat: parseLatLng(event.markedLocation)[0], lon: parseLatLng(event.markedLocation)[1] },
              ).toFixed(1)}{' '}
              km away
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-sm text-muted-foreground">When</h3>
              <p className="text-sm">
                {formatDate(event.startDate)} - {formatDate(event.endDate).split(',')[1]}
              </p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-1">
                <h3 className="font-medium text-sm text-muted-foreground">Where</h3>
                <p className="text-sm truncate max-w-[250px]">{event.location}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              {event.tags
                .split(',')
                .map((tag) => badges.find((badge) => badge.name === tag))
                .filter(Boolean)
                .slice(0, 3)
                .map(
                  (badge, index) =>
                    badge && (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-8 h-8 rounded-full bg-secondary/30 p-1 flex items-center justify-center">
                              <img src={badge.image || '/placeholder.svg'} alt={badge.name} className="w-full h-full object-contain" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{badge.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ),
                )}

              {event.tags.split(',').length > 3 && (
                <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-xs font-medium">
                  +{event.tags.split(',').length - 3}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User2Icon className="h-4 w-4" />
              <span>
                {attendeeCount}/{event?.capacity}
              </span>
            </div>
          </div>

          {/* Description preview */}
          <div className="pt-1">
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EventCard;
