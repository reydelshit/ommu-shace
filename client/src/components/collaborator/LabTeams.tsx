import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

export function LabTeams() {
  // Teams with subscription tiers that determine their grid placement
  const teams = [
    {
      id: 1,
      name: 'Team A',
      role: 'Volunteers',
      color: 'bg-orange-300',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'basic', // $99/month - 1x1 grid
    },
    {
      id: 2,
      name: 'Team B',
      role: 'Lights & Sound',
      color: 'bg-emerald-500',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'basic', // $99/month - 1x1 grid
    },
    {
      id: 3,
      name: 'Team C',
      role: 'Teams',
      color: 'bg-blue-500',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'basic', // $99/month - 1x1 grid
      useLetterAvatar: true,
    },
    {
      id: 4,
      name: 'Team D',
      role: 'Volunteers',
      color: 'bg-red-500',
      content: "If you're looking for a podcast studio",
      subContent: '(and mic)',
      placeholder: true,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      button: 'Collab',
      buttonColor: 'bg-blue-600',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'professional', // $249/month - 2x1 grid
      hasMoreMenu: true,
    },
    {
      id: 5,
      name: 'Team E',
      role: 'Volunteers',
      color: 'bg-amber-50',
      content: "Just in case you need my help, I'll be happy",
      subContent: 'to!',
      placeholder: true,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      button: 'Collab',
      buttonColor: 'bg-indigo-600',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'basic', // $99/month - 1x1 grid
      hasMoreMenu: true,
    },
    {
      id: 6,
      name: 'Team F',
      role: 'Artists',
      color: 'bg-black text-white',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'enterprise', // $499/month - 2x1 grid (could be 2x2)
    },
    {
      id: 7,
      name: 'Team H',
      role: 'Artists',
      color: 'bg-red-300',
      avatar: '/placeholder.svg?height=40&width=40',
      tier: 'basic', // $99/month - 1x1 grid
    },
  ];

  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-4">
      {/* First row */}
      <Card className={`${teams[0].color} border-none shadow-sm overflow-hidden col-span-1`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teams[0].avatar} alt={teams[0].name} />
                <AvatarFallback>{teams[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{teams[0].name}</h3>
                <p className="text-xs">{teams[0].role}</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded p-1">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${teams[1].color} border-none shadow-sm overflow-hidden col-span-1`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teams[1].avatar} alt={teams[1].name} />
                <AvatarFallback>{teams[1].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{teams[1].name}</h3>
                <p className="text-xs">{teams[1].role}</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded p-1">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${teams[2].color} border-none shadow-sm overflow-hidden col-span-1`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center text-xs font-medium">A</div>
              <div>
                <h3 className="font-medium text-sm">{teams[2].name}</h3>
                <p className="text-xs">{teams[2].role}</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded p-1">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second row */}
      <Card className={`${teams[3].color} border-none shadow-sm overflow-hidden col-span-2`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teams[3].avatar} alt={teams[3].name} />
                <AvatarFallback>{teams[3].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{teams[3].name}</h3>
                <p className="text-xs">{teams[3].role}</p>
              </div>
            </div>
            <MoreVertical className="h-4 w-4" />
          </div>

          <div className="mt-4">
            <p className="text-sm">{teams[3].content}</p>
            <p className="text-sm">{teams[3].subContent}</p>

            <div className="mt-2 bg-gray-200 w-full h-20 flex items-center justify-center rounded">
              <div className="flex flex-col items-center gap-1">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-gray-400 mb-2"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-sm"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <p className="text-xs mt-2">{teams[3].lorem}</p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button variant="outline" size="sm" className="rounded-full bg-blue-600 text-white hover:bg-blue-700 border-none">
            {teams[3].button}
          </Button>
        </CardFooter>
      </Card>

      <Card className={`${teams[4].color} border-none shadow-sm overflow-hidden col-span-1`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teams[4].avatar} alt={teams[4].name} />
                <AvatarFallback>{teams[4].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{teams[4].name}</h3>
                <p className="text-xs">{teams[4].role}</p>
              </div>
            </div>
            <MoreVertical className="h-4 w-4" />
          </div>

          <div className="mt-4">
            <p className="text-sm">{teams[4].content}</p>
            <p className="text-sm">{teams[4].subContent}</p>

            <div className="mt-2 bg-gray-200 w-full h-20 flex items-center justify-center rounded">
              <div className="flex flex-col items-center gap-1">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-gray-400 mb-2"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-sm"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <p className="text-xs mt-2">{teams[4].lorem}</p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button variant="outline" size="sm" className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 border-none">
            {teams[4].button}
          </Button>
        </CardFooter>
      </Card>

      {/* Third row */}
      <Card className={`${teams[5].color} border-none shadow-sm overflow-hidden col-span-2`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teams[5].avatar} alt={teams[5].name} />
                <AvatarFallback>{teams[5].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm text-white">{teams[5].name}</h3>
                <p className="text-xs text-white">{teams[5].role}</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded p-1">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${teams[6].color} border-none shadow-sm overflow-hidden col-span-1`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teams[6].avatar} alt={teams[6].name} />
                <AvatarFallback>{teams[6].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{teams[6].name}</h3>
                <p className="text-xs">{teams[6].role}</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded p-1">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
