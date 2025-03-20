import EventCardList from '@/components/tabs/EventCardList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GRID_LAYOUTS, useLayoutStore } from '@/store/useLayoutStore';
import GridLayoutSelector from './components/GridLayoutSelector';

const Dashboard = () => {
  const { layout } = useLayoutStore();

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
              <GridLayoutSelector />
              <EventCardList GRID_LAYOUT={GRID_LAYOUTS[layout]} />
            </TabsContent>
            <TabsContent className="w-full p-4 mt-[2rem]" value="campaign">
              <div className="text-start">List of all campaigns here</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
