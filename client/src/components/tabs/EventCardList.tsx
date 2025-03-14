import { useGetAllEvents } from '@/hooks/useEvent';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import EventCard from './events/EventCard';

const EventCardList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllEvents();
  const { ref, inView } = useInView();
  const DEFAULT_CENTER = useUserLocation();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const events =
    data?.pages.flatMap((page, index) => {
      console.log(`Page ${index + 1}: ${page.events.length} events`);
      return (page as any).events;
    }) || [];

  console.log('Total events loaded:', events.length);

  if (!DEFAULT_CENTER) return <p>Getting user location...</p>;

  return (
    <div className="z-0 ">
      <div>
        {events.map((event) => (
          <EventCard DEFAULT_CENTER={DEFAULT_CENTER} key={event.id} event={event} />
        ))}

        <div ref={ref} className="text-center p-4">
          {isFetchingNextPage ? 'Loading more events...' : hasNextPage ? 'Scroll down to load more' : 'No more events'}
        </div>
      </div>
    </div>
  );
};

export default EventCardList;
