import { useSession } from '@/hooks/useSession';
import { BadgePlus, Minimize, User, Users } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, session } = useSession();
  const [showOptions, setShowOptions] = useState(false);

  if (!session) return <p>Access Denied</p>;

  return (
    <div className="w-full min-h-screen relative flex flex-col gap-4">
      {/* tabs */}
      <div className="w-full flex item-center justify-center h-full">
        <div className="w-[80%] sticky rounded-3xl p-4 flex flex-col items-center  gap-4 ">
          <Tabs
            defaultValue="events"
            className="w-full rounded-md items-center justify-center flex"
          >
            <TabsList className="w-[350px] bg-white">
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-[#C5DEE0] data-[state=active]:text-black cursor-pointer"
                value="events"
              >
                Events
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-[#FFFDDB] data-[state=active]:text-black cursor-pointer"
                value="campaign"
              >
                Campaign
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="w-full p-4 border-t-0 border-amber-300"
              value="events"
            >
              <div className="text-start">lsit of all fucking events here</div>
            </TabsContent>
            <TabsContent
              className="w-full p-4 border-t-0 border-amber-300"
              value="campaign"
            >
              <div className="text-start">
                list of all fucking campaigns here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* side bar navigation */}
      <div className="flex flex-col items-center justify-center bg-[#F3F3F3] p-4 rounded-3xl w-[80px] h-[450px] gap-10 text-center sticky top-[60%] transform -translate-y-1/2 shadow-lg ">
        <div
          onClick={() => setShowOptions(!showOptions)}
          className="bg-yellow-400 w-full h-12 rounded-full flex items-center justify-center cursor-pointer"
        >
          {showOptions ? <Minimize size={24} /> : <BadgePlus size={24} />}
        </div>
        {showOptions && (
          <div className="absolute left-24 top-0 bg-white p-3 rounded-lg shadow-md w-40 animate-in slide-in-from-left duration-300">
            <div className="flex flex-col gap-3">
              <Link className=" w-full" to="/dashboard/create/campaign">
                <Button className="bg-[#C5DEE0] w-full cursor-pointer text-black font-medium py-2 px-3 rounded-lg text-sm hover:bg-yellow-500 transition-colors">
                  DASHBOARD
                </Button>
              </Link>
              <Link className=" w-full" to="/dashboard/create/event">
                <Button className="bg-yellow-text w-full cursor-pointer text-black font-medium py-2 px-3 rounded-lg text-sm hover:bg-yellow-500 transition-colors">
                  CREATE EVENT
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="text-center flex flex-col items-center cursor-pointer">
          <User />
          <span className="block text-[10px]">Profile</span>
        </div>

        <div className="text-center flex flex-col items-center cursor-pointer">
          <Users />
          <span className="block text-[10px]">Community</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
