import EventCardList from '@/components/tabs/EventCardList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GRID_LAYOUTS, useLayoutStore } from '@/store/useLayoutStore';
import GridLayoutSelector from './components/GridLayoutSelector';
import { Button } from '@/components/ui/button';
import ClosestEventsModal from './components/dashboard/MapWithMarkers';
import { useState } from 'react';
import MapWithMarkers from './components/dashboard/MapWithMarkers';

const Dashboard = () => {
  const { layout } = useLayoutStore();
  const [showMapEvents, setShowMapEvents] = useState(false);

  return (
    <div className="w-full min-h-screen relative flex">
      {/* tabs */}
      <div className="w-full flex item-center justify-center border-orange-400">
        <div className="w-[90%] rounded-3xl p-4 flex flex-col items-center gap-4 relative">
          <Tabs defaultValue="events" className="w-full rounded-md items-center justify-center flex">
            <TabsList className="w-[350px] bg-white top-28 fixed z-10 rounded-md flex gap-2">
              <TabsTrigger className="flex-1 data-[state=active]:bg-[#C5DEE0] data-[state=active]:text-black cursor-pointer" value="events">
                Events
              </TabsTrigger>
              <TabsTrigger className="flex-1 data-[state=active]:bg-[#FFFDDB] data-[state=active]:text-black cursor-pointer" value="campaign">
                Campaign
              </TabsTrigger>
            </TabsList>
            <TabsContent className="w-full p-4 mt-[2rem]" value="events">
              <div className="flex items-center justify-between my-4">
                <Button onClick={() => setShowMapEvents(true)} className=" text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Closest Events
                </Button>
                <GridLayoutSelector />
              </div>
              <EventCardList GRID_LAYOUT={GRID_LAYOUTS[layout]} />
            </TabsContent>
            <TabsContent className="w-full p-4 mt-[2rem]" value="campaign">
              <div className="text-start">List of all campaigns here</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {showMapEvents && (
        <div onClick={() => setShowMapEvents(false)} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <span className="absolute top-4 right-4 text-white">Press anywhere to close the modal</span>

          <div
            className="relative bg-white shadow-xl rounded-xl w-full max-w-6xl h-[80vh] p-6 mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // This prevents click from bubbling up to parent
          >
            {/* Map Component */}
            <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
              <MapWithMarkers />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
