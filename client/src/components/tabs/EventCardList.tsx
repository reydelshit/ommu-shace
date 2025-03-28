import { useGetAllEvents } from '@/hooks/useEvent';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import EventCard from './events/EventCard';
import { useSession } from '@/hooks/useSession';

const EventCardList = ({ showYourEvents, GRID_LAYOUT }: { showYourEvents: boolean; GRID_LAYOUT: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useGetAllEvents();
  const { user } = useSession();
  const { ref, inView } = useInView();
  const DEFAULT_CENTER = useUserLocation();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const events =
    data?.pages?.flatMap((page) => {
      if (!page || !Array.isArray(page.events)) {
        return [];
      }
      return page.events;
    }) ?? [];

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Error loading events</p>;

  console.log(events);

  if (!DEFAULT_CENTER) return <p>Getting user location...</p>;

  return (
    <div className="z-0 my-4 mb-[4rem]  ">
      <div className={`${GRID_LAYOUT} gap-8 full grid mb-10`}>
        {events
          .filter((event) => !showYourEvents || user?.id === event.userId)
          .map((event) => (
            <div key={event.id} className="h-full">
              <EventCard DEFAULT_CENTER={DEFAULT_CENTER} event={event} />
            </div>
          ))}

        {events.length === 0 && <p>No events found</p>}
      </div>
      <div ref={ref} className="text-center p-4">
        {isFetchingNextPage ? 'Loading more events...' : hasNextPage ? 'Scroll down to load more' : 'No more events'}
      </div>
    </div>
  );
};

export default EventCardList;
