import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function Changemakers() {
  const profiles = [
    {
      id: 1,
      name: 'John Peter',
      role: 'Environmentalist',
      description: 'Follow John in his quest',
      avatar: '/placeholder.svg?height=100&width=100',
      color: 'bg-yellow-200',
    },
    {
      id: 2,
      name: 'Mac Gregor',
      role: 'Social Creature',
      description: 'Learn how Mac started his journey',
      avatar: '/placeholder.svg?height=100&width=100',
      color: 'bg-yellow-200',
    },
    {
      id: 3,
      name: 'Can Nito',
      role: 'Philanthropist',
      description: 'Why am I here?',
      avatar: '/placeholder.svg?height=100&width=100',
      color: 'bg-yellow-200',
    },
    {
      id: 4,
      name: 'Can Nito',
      role: 'Observer',
      description: 'Why am I here?',
      avatar: '/placeholder.svg?height=100&width=100',
      color: 'bg-yellow-200',
    },
    {
      id: 5,
      name: 'Can Nito',
      role: 'Observer',
      description: 'Why am I here?',
      avatar: '/placeholder.svg?height=100&width=100',
      color: 'bg-yellow-200',
    },
  ];

  const featuredProfiles = [
    {
      id: 6,
      title: 'Collaborator of the month',
      subtitle: 'TeamPH',
      description: 'Join Team Fun!',
      color: 'bg-orange-300',
    },
    {
      id: 7,
      title: 'CALUMPMND',
      subtitle: 'Home of the Creators',
      description: '',
      color: 'bg-emerald-400',
    },
    {
      id: 8,
      title: 'Event of the month',
      subtitle: 'WIW by womenOrg',
      description: 'Get notification about this recurring event',
      color: 'bg-gray-100 border border-black',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Celebrate the Changemakers</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className={`${profile.color} border-none shadow-sm overflow-hidden`}>
            <div className="aspect-square w-full bg-white/30 flex items-center justify-center mb-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardContent className="p-4 pt-2">
              <h3 className="font-bold">{profile.name}</h3>
              <p className="text-sm font-medium">{profile.role}</p>
              <p className="text-xs mt-1">{profile.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {featuredProfiles.map((profile, index) => (
          <Card key={profile.id} className={`${profile.color} border-none shadow-sm ${index === 2 ? 'bg-black text-white' : ''}`}>
            <CardContent className="p-4 h-32 flex flex-col justify-end">
              <h3 className="font-bold">{profile.title}</h3>
              <p className="text-sm font-medium">{profile.subtitle}</p>
              {profile.description && <p className="text-xs mt-1">{profile.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
