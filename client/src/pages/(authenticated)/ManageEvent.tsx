import BackButton from '@/components/BackButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGetSpecificEvent, useUpdateAttendanceStatus } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { badges } from '@/lib/badges';
import { DefaultProfile } from '@/utils/defaultImages';
import { getAttendanceButtonColor } from '@/utils/getAttendanceButtonColor';
import { randomColor } from '@/utils/randomColor';
import { useQueryClient } from '@tanstack/react-query';
import { MapPin, Search, Users } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import ShareModal from './components/events/ShareModal';
import Registration from './components/manage-event/RegistrationGuest';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ManageEvent = () => {
  const { eventId } = useParams<{ eventId: string }>() ?? '';
  const { user } = useSession();
  const { data, isLoading, isError } = useGetSpecificEvent(eventId ?? '', user?.id ?? '');
  const updateAttendanceMutation = useUpdateAttendanceStatus();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');

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

  const updateAttendanceStatus = (attendanceId: string, status: string) => {
    console.log('Updating attendance status:', attendanceId, status);

    updateAttendanceMutation.mutate(
      { attendanceId, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['events', eventId, user?.id] });

          toast('Attendance status updated successfully');
        },
        onError: (error) => {
          console.error('Error updating attendance status:', error);
        },
      },
    );
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <BackButton />
      <div className="w-[95%] my-4  self-center border-4 border-teal-600 items-center mb-[5rem] min-h-screen relative bg-white p-8 border-none rounded-3xl">
        <div className="flex w-full items-center justify-between mb-6">
          <h1 className="text-4xl font-bold font-boldonse">{eventData.eventName}</h1>

          <Link to={`/event/${eventId}`}>
            <Button variant={'default'} size="sm">
              See what others see
            </Button>
          </Link>
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
                <div className="flex items-center space-x-2 text-white text-sm mt-1">
                  <div className="flex flex-wrap gap-2 my-4">
                    {matchedBadges.map(
                      (badge, index) =>
                        badge && (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger>
                                <img src={badge.image} alt={badge.name} className="w-18 h-18" />
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
              <div className="bg-gray-100 w-[10rem] h-[10rem] items-center p-4 flex justify-center rounded-lg mr-4 flex-col">
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
            </div>

            {/* Location Section */}
            <div className="flex items-center mb-6 ">
              <div className="bg-gray-100 w-[11.5rem] h-[10rem] items-center p-4 flex justify-center rounded-lg mr-4">
                <MapPin className="h-12 w-12" />
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
                <Dialog>
                  <DialogTrigger>
                    <Button className="cursor-pointer">+ Add Host</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-gray-500 text-sm mb-4">Add hosts, special guests, and event managers.</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className=" h-11 w-11  object-cover  bg-white border-white cursor-pointer">
                    <AvatarImage
                      src={
                        eventData?.user && eventData?.user.profilePicture.trim() !== ''
                          ? `${import.meta.env.VITE_BACKEND_URL}${eventData?.user.profilePicture}`
                          : DefaultProfile
                      }
                      alt="profile"
                      className="object-cover"
                    />
                  </Avatar>
                  <span className="text-black font-semibold">
                    {eventData.user?.fullname} ({eventData.user?.email})
                  </span>
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
                  <Badge variant="secondary">{eventData.attendees.length}</Badge>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search guests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
              </div>

              <div className="bg-gray-50 rounded-lg">
                <ScrollArea className="h-[400px] w-full">
                  <div className="p-4 space-y-2">
                    {eventData.attendees.map((attendance) => (
                      <div key={attendance.id} className="flex items-center space-x-4 p-3 hover:bg-white rounded-lg transition-colors">
                        <Avatar>
                          <AvatarImage
                            className="object-cover"
                            src={
                              attendance.user?.profilePicture && attendance.user?.profilePicture.trim() !== ''
                                ? `${import.meta.env.VITE_BACKEND_URL}${attendance.user?.profilePicture}`
                                : DefaultProfile
                            }
                          />
                          <AvatarFallback>
                            {attendance.user?.fullname
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{attendance.user?.fullname}</div>
                          <div className="text-sm text-gray-500">{attendance.user?.email}</div>
                        </div>
                        <Badge
                          className={`${getAttendanceButtonColor(attendance.status ?? '')}`}
                          variant={attendance.status === 'CHECKED_IN' ? 'default' : 'secondary'}
                        >
                          {attendance.status}
                        </Badge>
                        <Select onValueChange={(value) => updateAttendanceStatus(attendance.id, value)}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="APPROVED">Approved</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                            <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="registration">
            <Registration eventData={eventData} />
          </TabsContent>

          <TabsContent value="share">
            <div className="flex items-center justify-center h-[400px] text-gray-500">
              <ShareModal />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageEvent;
