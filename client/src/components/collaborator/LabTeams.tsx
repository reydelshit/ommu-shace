import Reydel from '@/assets/profiles/Reydel.jpg';
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
    <div className="grid grid-cols-6 grid-rows-4 gap-4 w-full min-h-screen p-4">
      {/* Large Card - Top Left (Spans 4 columns, 3 rows) */}
      <div
        className="
          col-span-4 row-span-3 
          bg-blue-100 
          rounded-2xl 
          relative 
          overflow-hidden
          shadow-lg
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-4xl text-white font-bold">Design Disruption</h3>
          <p className="text-sm font-medium text-white">Emma Rodriguez</p>
          <p className="text-xs mt-1 opacity-80 text-white">Reimagining User Experience in the Digital Age</p>
        </div>
      </div>

      {/* Small Card 1 - Top Right (Spans 2 columns, 2 rows) */}
      <div
        className="
          col-span-2 row-span-2
          bg-green-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">AI Frontiers</h3>
          <p className="text-sm font-medium text-white">Alex Chen</p>
          <p className="text-xs mt-1 opacity-80 text-white">Machine Learning Beyond Boundaries</p>
        </div>
      </div>

      {/* Small Card 2 - Bottom Right 1 (Spans 1 column, 1 row) */}
      <div
        className="
          col-span-1 row-span-1
          bg-black 
          text-white
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Tech Revolution</h3>
          <p className="text-sm font-medium text-white">Marcus Williams</p>
          <p className="text-xs mt-1 opacity-80 text-white">Transforming Industries</p>
        </div>
      </div>

      {/* Small Card 3 - Bottom Right 2 (Spans 1 column, 1 row) */}
      <div
        className="
          col-span-1 row-span-1
          bg-red-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Startup Secrets</h3>
          <p className="text-sm font-medium text-white">Sophia Lee</p>
          <p className="text-xs mt-1 opacity-80 text-white">Scaling to Global Impact</p>
        </div>
      </div>

      {/* Extra Small Card 4 - Bottom Right 3 (Spans 1 column, 1 row) */}
      <div
        className="
          col-span-1 row-span-4
          bg-purple-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Innovation Talk</h3>
          <p className="text-sm font-medium text-white">Jake Thompson</p>
          <p className="text-xs mt-1 opacity-80 text-white">Breaking Tech Barriers</p>
        </div>
      </div>

      {/* Extra Small Card 5 - Bottom Right 4 (Spans 1 column, 1 row) */}
      <div
        className="
          col-span-1 row-span-4
          bg-yellow-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Future Trends</h3>
          <p className="text-sm font-medium text-white">Emily Wang</p>
          <p className="text-xs mt-1 opacity-80 text-white">Predicting Tomorrow</p>
        </div>
      </div>

      <div
        className="
          col-span-4 row-span-8
          bg-yellow-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Future Trends</h3>
          <p className="text-sm font-medium text-white">Emily Wang</p>
          <p className="text-xs mt-1 opacity-80 text-white">Predicting Tomorrow</p>
        </div>
      </div>

      <div
        className="
          col-span-2 row-span-20
          bg-yellow-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Future Trends</h3>
          <p className="text-sm font-medium text-white">Emily Wang</p>
          <p className="text-xs mt-1 opacity-80 text-white">Predicting Tomorrow</p>
        </div>
      </div>

      <div
        className="
          col-span-2 row-span-16
          bg-yellow-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Future Trends</h3>
          <p className="text-sm font-medium text-white">Emily Wang</p>
          <p className="text-xs mt-1 opacity-80 text-white">Predicting Tomorrow</p>
        </div>
      </div>

      <div
        className="
          col-span-2 row-span-16
          bg-yellow-100 
          rounded-2xl 
          relative 
          overflow-hidden
         
          shadow-md
        "
        style={{
          backgroundImage: `url(${Reydel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-lg font-bold text-white">Future Trends</h3>
          <p className="text-sm font-medium text-white">Emily Wang</p>
          <p className="text-xs mt-1 opacity-80 text-white">Predicting Tomorrow</p>
        </div>
      </div>
    </div>
  );
}
