import { Changemakers } from '@/components/collaborator/Changemakers';
import { DifferenceMakers } from '@/components/collaborator/DifferenceMakers';
import { LabTeams } from '@/components/collaborator/LabTeams';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Collaborator = () => {
  const [activeTab, setActiveTab] = useState('xlab');

  return (
    <div className="relative w-[95%] min-h-screen max-w-full mx-auto  rounded-lg overflow-hidden mb-[8rem] pb-8">
      <Tabs defaultValue="xlab" className="w-full my-4 min-h-screen " onValueChange={(value) => setActiveTab(value)}>
        <div className="flex items-center justify-between border-b border-gray-200">
          <TabsList className="h-10 bg-transparent mb-2">
            <TabsTrigger value="xlab" className="rounded-2xl cursor-pointer  data-[state=active]:bg-black data-[state=active]:text-white px-4 h-10">
              xLab
            </TabsTrigger>
            <TabsTrigger value="awards" className="rounded-2xl cursor-pointer  data-[state=active]:bg-black data-[state=active]:text-white px-4 h-10">
              Awards
            </TabsTrigger>
            <TabsTrigger value="impact" className="rounded-2xl cursor-pointer  data-[state=active]:bg-black data-[state=active]:text-white px-4 h-10">
              Impact
            </TabsTrigger>
          </TabsList>

          {activeTab === 'xlab' && (
            <div className="text-sm hidden md:block">
              <span>Want your team/name to be featured here?</span>{' '}
              <span>
                see our{' '}
                <Link to="/pricing" className="text-blue-500 hover:underline">
                  pricing
                </Link>
              </span>
            </div>
          )}
        </div>

        <TabsContent value="awards" className="mt-6">
          <Changemakers />
        </TabsContent>

        <TabsContent value="impact" className="mt-6">
          <DifferenceMakers />
        </TabsContent>

        <TabsContent value="xlab" className="mt-6">
          <LabTeams />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Collaborator;
