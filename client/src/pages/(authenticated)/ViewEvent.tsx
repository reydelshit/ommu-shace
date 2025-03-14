import { randomColor } from '@/components/tabs/events/EventCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useAttendEvent, useGetSpecificEvent } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { badges } from '@/lib/badges';
import { formatDate } from '@/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import { User2Icon } from 'lucide-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ViewEvent = () => {
  const { eventId } = useParams<{ eventId: string }>() ?? '';
  const { user } = useSession();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useGetSpecificEvent(eventId ?? '', user?.id ?? '');

  const eventData = data?.event ?? null;
  const isUserAttending = data?.isUserAttending ?? false;
  const isEventFull = data?.isEventFull ?? false;
  const isUserCreator = eventData?.userId === user?.id;

  const attendEventMuration = useAttendEvent();

  const handleAttendEvent = () => {
    attendEventMuration.mutate(
      {
        eventId: eventId ?? '',
        userId: user?.id ?? '',
      },
      {
        onSuccess: async (data) => {
          console.log('Attend event success:', data);

          await queryClient.invalidateQueries({ queryKey: ['events', eventId, user?.id] });
          await queryClient.invalidateQueries({ queryKey: ['attendees', eventId] });

          // navigate('/dashboard');

          toast('Event joined successfully', {
            description: 'You have successfully joined the event',
          });
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
          // setError(error.response.data.message);
        },
      },
    );
  };

  const attendees = [
    { name: 'Liz Sanchez', avatar: '/api/placeholder/32/32' },
    { name: 'Khim Castle', avatar: '/api/placeholder/32/32' },
    { name: 'User 3', avatar: '/api/placeholder/32/32' },
    { name: 'User 4', avatar: '/api/placeholder/32/32' },
  ];

  console.log('Event data:', eventData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load event</p>;
  }

  if (!eventData) return <p>Event not found</p>;

  const tagList = eventData.tags.split(',');
  const matchedBadges = tagList.map((tag: string) => badges.find((badge) => badge.name === tag)).filter(Boolean);

  const userAttendance = eventData.attendees.find((attendee) => attendee.userId === user?.id);
  const userAttendanceStatus = userAttendance ? userAttendance.status : null;

  return (
    <div className="w-full flex flex-col items-center min-h-screen pb-12">
      <div className="w-[80%] mx-auto bg-white rounded-lg overflow-hidden shadow-lg my-8 flex flex-col">
        {/* Banner as cover photo */}
        <div className="w-full h-48 bg-gray-200 relative">
          {eventData?.bannerPath && eventData?.bannerPath !== 'null' ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${eventData.bannerPath}`}
              alt={eventData?.eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full ${randomColor}`}></div>
          )}
        </div>

        <div className="p-6 flex-1">
          {/* Event Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-start mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{eventData?.eventName}</h1>
                <p className="text-sm text-gray-600 mt-1">Hosted by {eventData?.user.fullname}</p>
              </div>
            </div>

            <p className="text-sm font-medium mb-4 flex items-center gap-2">
              <User2Icon className="h-4 w-4" /> {eventData?.attendees.filter((attend) => attend.status === 'APPROVED').length} / {eventData?.capacity}{' '}
              attendees
            </p>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center w-full">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{formatDate(eventData?.startDate)}</p>
                  <p className="text-sm text-gray-600">Event start</p>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{formatDate(eventData?.endDate)}</p>
                  <p className="text-sm text-gray-600">Event ends</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">{eventData?.location}</p>
                <p className="text-sm text-gray-600">{eventData?.markedLocation}</p>
              </div>
            </div>

            <div className="mt-1 h-[300px] rounded-lg overflow-hidden border relative z-0">
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
          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap gap-2 my-4">
            {matchedBadges.map(
              (badge, index) =>
                badge && (
                  <Badge variant={'outline'} key={index} className="cursor-pointer p-1 rounded-full">
                    <HoverCard>
                      <HoverCardTrigger className="flex gap-2 items-center">
                        <img src={badge.image} alt={badge.name} className="w-6 h-6" />
                        {badge.name}
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-transparent border-none shadow-none text-xs">{badge.name}</HoverCardContent>
                    </HoverCard>
                  </Badge>
                ),
            )}
          </div>

          {/* Event Description */}
          <div className="mb-6 max-w-[550px]">
            <p className="text-gray-700 break-words whitespace-pre-wrap w-full">{eventData?.description}</p>
          </div>

          {/* Attendees */}
          <div className="mb-6">
            <div className="flex -space-x-2">
              {attendees.map((attendee, index) => (
                <div key={index} className="inline-block">
                  <img src={attendee.avatar} alt={attendee.name} className="w-8 h-8 rounded-full border-2 border-white" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">+6</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Liz Sanchez, Khim Castle and 8 others</p>
          </div>

          <Button
            onClick={handleAttendEvent}
            disabled={isEventFull || isUserCreator}
            className={`px-6 cursor-pointer py-2 ${
              userAttendanceStatus === 'APPROVED'
                ? 'bg-green-400 hover:bg-green-500'
                : userAttendanceStatus === 'PENDING'
                ? 'bg-yellow-400 hover:bg-yellow-500'
                : userAttendanceStatus === 'REJECTED'
                ? 'bg-red-400 hover:bg-red-500'
                : ''
            } text-white rounded-full font-medium transition duration-200 btn ${isUserAttending || isEventFull ? 'btn-disabled' : 'btn-primary'}`}
          >
            {isUserAttending
              ? userAttendanceStatus === 'APPROVED'
                ? 'View Ticket'
                : userAttendanceStatus === 'PENDING'
                ? 'Pending Approval'
                : userAttendanceStatus === 'REJECTED'
                ? 'Rejected'
                : 'Unknown Status'
              : isEventFull
              ? 'Event is full'
              : isUserCreator
              ? 'You are the host'
              : 'Attend Event'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
