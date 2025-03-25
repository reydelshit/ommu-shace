import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetSpecificEvent } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { badges } from '@/lib/badges';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, MapPin, Search, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import moment from 'moment';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { randomColor } from '@/utils/randomColor';

const mockGuests = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Not Checked In' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Checked In' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Not Checked In' },
  // Add more mock guests as needed
];

const YourEventsView = () => {
  const { eventId } = useParams<{ eventId: string }>() ?? '';
  const { user } = useSession();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetSpecificEvent(eventId ?? '', user?.id ?? '');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);

  const filteredGuests = mockGuests.filter(
    (guest) => guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || guest.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleGuestSelection = (guestId: number) => {
    setSelectedGuests((prev) => (prev.includes(guestId) ? prev.filter((id) => id !== guestId) : [...prev, guestId]));
  };

  const eventData = data?.event ?? null;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load event</p>;
  }

  if (!eventData) return <p>Event not found</p>;

  const tagList = eventData.tags.split(',');
  const matchedBadges = tagList.map((tag: string) => badges.find((badge) => badge.name === tag)).filter(Boolean);

  return (
    <div className="w-[95%] items-center mb-[5rem] min-h-screen relative bg-white p-4 border-none rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{eventData.eventName}</h1>
        <Button variant="default" size="sm" className="rounded-full">
          Event Page →
        </Button>
      </div>

      {/* Navigation */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-[400px] grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Event Image Card */}
          <div className="relative rounded-xl overflow-hidden mb-6">
            <div className="w-full h-80 bg-gray-200 relative">
              {eventData?.bannerPath && eventData?.bannerPath !== 'null' ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${eventData.bannerPath}`}
                  alt={eventData?.eventName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, ${randomColor}, #6A5ACD)`,
                  }}
                ></div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <h2 className="text-white text-xl font-semibold">{eventData.eventName}</h2>
              <div className="flex items-center space-x-2 text-white text-sm mt-1">
                <div className="flex flex-wrap gap-2 my-4">
                  {matchedBadges.map(
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
          </div>

          {/* Date Section */}
          <div className="flex items-center mb-6">
            <div className="bg-gray-50 p-12 text-center rounded-lg mr-4">
              <div className="text-gray-600 uppercase text-sm">{moment(eventData.startDate).format('MMMM')}</div>
              <div className="text-3xl font-bold">{moment(eventData.startDate).format('DD')}</div>
            </div>
            <div>
              <div className="font-semibold">
                {(() => {
                  const startDate = moment(eventData.startDate);
                  const today = moment();
                  const diffDays = startDate.diff(today, 'days');

                  if (diffDays === 0) {
                    return 'Today';
                  } else if (diffDays > 0) {
                    return `In ${diffDays} ${diffDays === 1 ? 'Day' : 'Days'}`;
                  } else {
                    return `${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? 'Day' : 'Days'} Ago`;
                  }
                })()}
              </div>
              <div className="text-gray-600">
                {moment(eventData.startDate).format('h:mm A')} - {moment(eventData.startDate).format('MMMM DD, h:mm A')}
              </div>
            </div>
            {/* <Button variant="secondary" size="sm" className="ml-auto">
              Check in Guests
            </Button> */}
          </div>

          {/* Location Section */}
          <div className="flex items-center mb-6 w-full">
            <div className="bg-gray-50 p-12 rounded-lg mr-4">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="w-full">
              <div className="font-semibold">{eventData.location}</div>
              <div className="text-gray-600">{eventData.markedLocation}</div>
              <div className="text-gray-400 text-sm mt-2">The address is shown publicly on the event page.</div>
            </div>
          </div>

          <div className="mt-1 h-[300px] rounded-lg overflow-hidden relative z-0">
            <MapContainer
              center={[Number(eventData?.markedLocation.split(',')[0]), Number(eventData?.markedLocation.split(',')[1])]}
              zoom={16}
              scrollWheelZoom={false}
              dragging={false}
              touchZoom={false}
              doubleClickZoom={false}
              boxZoom={false}
              keyboard={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[Number(eventData?.markedLocation.split(',')[0]), Number(eventData?.markedLocation.split(',')[1])]} />
            </MapContainer>
          </div>

          {/* Host Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Host</h3>
              <Button variant="outline" size="sm">
                + Add Host
              </Button>
            </div>
            <p className="text-gray-500 text-sm mb-4">Add hosts, special guests, and event managers.</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <span className="font-semibold mr-2">TeamPH</span>
                <span className="text-gray-600">TeamPH@gmail.com</span>
                <Badge variant="secondary" className="ml-2">
                  Creator
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guests">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Guest List</h2>
                <Badge variant="secondary">{mockGuests.length}</Badge>
              </div>
              <Button variant="default" size="sm" disabled={selectedGuests.length === 0}>
                <UserCheck className="mr-2 h-4 w-4" />
                Check In Selected
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search guests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
            </div>

            <div className="bg-gray-50 rounded-lg">
              <ScrollArea className="h-[400px] w-full">
                <div className="p-4 space-y-2">
                  {filteredGuests.map((guest) => (
                    <div key={guest.id} className="flex items-center space-x-4 p-3 hover:bg-white rounded-lg transition-colors">
                      <Checkbox checked={selectedGuests.includes(guest.id)} onCheckedChange={() => toggleGuestSelection(guest.id)} />
                      <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${guest.email}`} />
                        <AvatarFallback>
                          {guest.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{guest.name}</div>
                        <div className="text-sm text-gray-500">{guest.email}</div>
                      </div>
                      <Badge variant={guest.status === 'Checked In' ? 'default' : 'secondary'}>{guest.status}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="registration">
          <div className="flex items-center justify-center h-[400px] text-gray-500">Registration content coming soon...</div>
        </TabsContent>

        <TabsContent value="share">
          <div className="flex items-center justify-center h-[400px] text-gray-500">Share content coming soon...</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourEventsView;
