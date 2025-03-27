import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAttendEvent, useGetSpecificEvent } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { badges } from '@/lib/badges';
import { formatDate } from '@/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import { Calendar, MapPin, PencilIcon, Settings, User2Icon, Users } from 'lucide-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DefaultProfile } from '@/utils/defaultImages';
import { getAttendanceButtonColor } from '@/utils/getAttendanceButtonColor';
import { randomColor } from '@/utils/randomColor';
import { useState } from 'react';
import { QRCodeShare } from './components/QRCodeShare';
import BackButton from '@/components/BackButton';
import ShareModal from './components/events/ShareModal';
import { Badge } from '@/components/ui/badge';

const ViewEvent = () => {
  const { eventId } = useParams<{ eventId: string }>() ?? '';
  const { user } = useSession();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetSpecificEvent(eventId ?? '', user?.id ?? '');
  const [showQRCode, setShowQRCode] = useState(false);
  const eventData = data?.event ?? null;
  const isUserAttending = data?.isUserAttending ?? false;
  const isEventFull = data?.isEventFull ?? false;
  const isUserCreator = eventData?.userId === user?.id;
  const navigate = useNavigate();

  const attendEventMuration = useAttendEvent();

  const handleAttendEvent = () => {
    attendEventMuration.mutate(
      {
        eventId: eventId ?? '',
        userId: user?.id ?? '',
        attendStatus: eventData?.isNeedApproval === 'true' ? 'PENDING' : 'APPROVED',
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
  const userAttendanceId = userAttendance ? userAttendance.id : null;
  const isCreator = eventData.user.id === user?.id;

  return (
    <div className="w-full flex flex-col items-center min-h-screen pb-12 relative">
      <BackButton />
      <div className="w-[95%] mx-auto bg-white rounded-lg overflow-hidden shadow-lg my-8 flex flex-col">
        {eventData.isNeedApproval === 'true' && (
          <div className="absolute top-4 flex right-8 bg-white text-black px-2 py-1 rounded-md text-xs gap-2">
            <Users className="h-4 w-4" /> Approval needed
          </div>
        )}
        <div className="w-full h-80 bg-gray-200 relative">
          {user?.id === eventData?.userId && (
            <Link to={`/manage-event/${eventId}`}>
              <Button className="absolute top-4 flex right-4 px-2 py-1 rounded-md text-xs gap-2">
                <Settings className="h-4 w-4" /> Manage Event
              </Button>
            </Link>
          )}
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

        <div className="p-6 flex-1">
          {/* Event Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-start mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-boldonse text-gray-900 my-4">{eventData?.eventName}</h1>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 ring-2 ring-white/70">
                    <AvatarImage
                      src={
                        eventData?.user.profilePicture && eventData?.user.profilePicture.trim() !== ''
                          ? `${import.meta.env.VITE_BACKEND_URL}${eventData?.user.profilePicture}`
                          : DefaultProfile
                      }
                      alt="profile"
                      className="object-cover"
                    />
                  </Avatar>
                  <Badge variant="secondary" className="font-medium text-xs">
                    {isCreator ? 'You' : eventData.user.fullname}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium mb-4 flex items-center gap-2">
              <User2Icon className="h-4 w-4" /> {eventData?.attendees.filter((attend) => attend.status === 'APPROVED').length} / {eventData?.capacity}{' '}
              attendees
            </p>
          </div>

          {/* Event Description */}
          <div className="mb-6 max-w-[800px]">
            <p className=" break-words whitespace-pre-wrap w-full italic">{eventData?.description}</p>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-muted-foreground">When</h3>
                  <p className="text-sm">
                    {formatDate(eventData.startDate)} - {formatDate(eventData.endDate).split(',')[1]}
                  </p>
                </div>
              </div>
            </div>

            {eventData.location && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase">{eventData.location}</h3>
                  <p className="text-sm  max-w-[250px]">{eventData.markedLocation}</p>
                </div>
              </div>
            )}

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

          {/* Attendees */}
          <div className="mb-6">
            <div className="flex -space-x-2">
              {eventData.attendees
                .slice(0, 6)
                .filter((attendee) => attendee.status === 'APPROVED')
                .map((attendee, index) => (
                  <div key={index} className="inline-block">
                    <img
                      src={
                        attendee.user?.profilePicture && attendee.user.profilePicture.trim() !== ''
                          ? `${import.meta.env.VITE_BACKEND_URL}${attendee.user.profilePicture}`
                          : DefaultProfile
                      }
                      alt={attendee.user?.fullname}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </div>
                ))}
              {eventData.attendees.length > 6 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                  +{eventData.attendees.length - 6}
                </div>
              )}
            </div>

            {/* Display attendee names */}
            <p className="text-xs text-gray-600 mt-2">
              {eventData.attendees
                ?.filter((attendee) => attendee.status === 'APPROVED')
                .slice(0, 3) // Then slice
                .map((attendee) => (attendee.user?.id === user?.id ? 'You' : attendee.user?.fullname))
                .join(', ')}
              {eventData.attendees?.filter((attendee) => attendee.status === 'APPROVED').length > 3 &&
                ` and ${eventData.attendees.filter((attendee) => attendee.status === 'APPROVED').length - 3} others`}
            </p>
          </div>

          <div className="w-full flex justify-between items-center">
            <>
              {userAttendanceStatus === 'APPROVED' || userAttendanceStatus === 'CHECKED_IN' ? (
                <Button
                  onClick={() => setShowQRCode(true)}
                  className={`px-6 cursor-pointer py-2 text-white rounded-full font-medium transition duration-200  ${getAttendanceButtonColor(
                    userAttendanceStatus ?? '',
                  )} `}
                >
                  View Ticket
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (!user) {
                      navigate(`/login?redirect=/event/${eventId}`); // Redirect to login
                      return;
                    }
                    if (!isUserAttending) {
                      handleAttendEvent(); // Proceed if logged in
                    }
                  }}
                  disabled={isEventFull || isUserCreator}
                  className={`px-6 cursor-pointer py-2 ${getAttendanceButtonColor(userAttendanceStatus ?? '')} 
              text-white rounded-full font-medium transition duration-200 
              btn ${isUserAttending || isEventFull ? 'btn-disabled' : 'btn-primary'}`}
                >
                  {isUserAttending
                    ? userAttendanceStatus === 'PENDING'
                      ? 'Pending Approval'
                      : userAttendanceStatus === 'APPROVED'
                      ? 'Approved'
                      : userAttendanceStatus === 'CHECKED_IN'
                      ? 'Checked In'
                      : userAttendanceStatus === 'REJECTED'
                      ? 'Rejected'
                      : 'Unknown Status'
                    : isEventFull
                    ? 'Event is full'
                    : isUserCreator
                    ? 'You are the host'
                    : 'Attend Event'}
                </Button>
              )}
            </>

            <ShareModal />
          </div>
        </div>
      </div>

      {showQRCode && (
        <QRCodeShare
          setShowQRCode={setShowQRCode}
          userAttendance={userAttendance}
          userAttendanceId={userAttendanceId ?? undefined}
          event={eventData}
        />
      )}
    </div>
  );
};

export default ViewEvent;
