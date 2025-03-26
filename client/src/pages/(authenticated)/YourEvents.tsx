import { useGetAllEvents } from '@/hooks/useEvent';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useSession } from '@/hooks/useSession';
// import EventCard from './events/EventCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BaseEvent } from '@/types/events';
import { formatDate } from '@/utils/formatDate';
import { randomColor } from '@/utils/randomColor';
import { CalendarIcon, User2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { badges } from '@/lib/badges';

const YourEvents = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllEvents();
  const { user } = useSession();

  const { ref, inView } = useInView();
  const DEFAULT_CENTER = useUserLocation();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const events =
    data?.pages.flatMap((page, index) => {
      console.log(`Page ${index + 1}: ${page.events.length} events`);
      return (page as any).events;
    }) || [];

  console.log('Total events loaded:', events.length);

  if (!DEFAULT_CENTER) return <p>Getting user location...</p>;

  const userEvents: BaseEvent[] = useMemo(() => {
    if (!user?.id) return [];
    return (events || []).filter((event) => event.userId === user?.id);
  }, [events, user?.id]);

  return (
    <div className="z-0 my-4 mb-[8rem]">
      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between my-4">
          <h1>All of your events</h1>
        </div>

        <div className={` gap-8 full grid mb-10`}>
          {/* {userEvents.map((event) => (
            <div key={event.id} className="h-full">
              <YourEventsViewCard event={event} />
            </div>
          ))} */}

          <ScrollArea className="h-[600px] w-full">
            <div className="p-4 space-y-2 w-[90%] mx-auto">
              {userEvents.map((event) => (
                <Link to={`/manage-event/${event.id}`} key={event.id} className="block">
                  <div
                    className="relative flex items-center h-[150px] space-x-4 p-3 rounded-lg transition-transform overflow-hidden w-full hover:scale-105 "
                    style={{
                      backgroundImage:
                        event.bannerPath && event.bannerPath !== 'null'
                          ? `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})`
                          : `linear-gradient(135deg, ${randomColor}, #6A5ACD)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Overlay to improve readability */}
                    <div className="absolute inset-0 bg-black opacity-40 w-full"></div>

                    <div className="relative z-10 flex items-center space-x-4 w-full">
                      <div className="flex-1 text-white">
                        <div className="font-medium text-lg">{event.eventName}</div>
                        <div className="text-sm flex items-center gap-2 text-gray-200">
                          <CalendarIcon className="h-3 w-3" />
                          {formatDate(event.startDate)} - {formatDate(event.endDate)}
                        </div>

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
                      <div className="flex flex-col items-end">
                        <p className="text-xs font-medium mb-4 flex items-center gap-2 text-white">
                          <User2Icon className="h-4 w-4" />
                          {event?.attendees.filter((attend) => attend.status === 'APPROVED').length} /{event?.capacity} attendees
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>

          <div ref={ref} className="text-center p-4">
            {isFetchingNextPage ? 'Loading more events...' : hasNextPage ? 'Scroll down to load more' : 'No more events'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourEvents;
