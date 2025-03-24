import { useGetAllEvents } from '@/hooks/useEvent';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import YourEventsViewCard from './components/YourEventsViewCard';
import GridLayoutSelector from './components/GridLayoutSelector';
import { useSession } from '@/hooks/useSession';
// import EventCard from './events/EventCard';

const YourEvents = ({ GRID_LAYOUT }: { GRID_LAYOUT: string }) => {
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

  const userEvents = useMemo(() => {
    if (!user?.id) return [];
    return (events || []).filter((event) => event.userId === user?.id);
  }, [events, user?.id]);

  return (
    <div className="z-0 my-4">
      <div className="w-[90%] mx-auto">
        <GridLayoutSelector />

        <div className={`${GRID_LAYOUT} gap-8 full grid mb-10`}>
          {userEvents.map((event) => (
            <div key={event.id} className="h-full">
              <YourEventsViewCard DEFAULT_CENTER={DEFAULT_CENTER} event={event} />
            </div>
          ))}

          <div ref={ref} className="text-center p-4">
            {isFetchingNextPage ? 'Loading more events...' : hasNextPage ? 'Scroll down to load more' : 'No more events'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourEvents;
