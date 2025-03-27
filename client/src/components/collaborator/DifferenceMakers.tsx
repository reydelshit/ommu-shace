import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DifferenceMakers() {
  const project = {
    title: 'Project: Greener Tomorrow - Community Tree Planting',
    teamInfo: 'TeamPH + Volunteers',
    stats: ['500+ trees planted', '150+ volunteers participated', '2 hectares of land restored'],
    testimonial: {
      quote:
        '"It was inspiring to see so many people come together for a common cause. The enthusiasm and dedication shown by the volunteers ensured that our community now has a greener future."',
      author: '– John D.',
      role: 'Project Lead',
    },
    avatars: ['/placeholder.svg?height=40&width=40', '/placeholder.svg?height=40&width=40', '/placeholder.svg?height=40&width=40'],
  };

  const quotes = [
    { id: 1, title: 'Title', description: 'Description' },
    { id: 2, title: 'Title', description: 'Description' },
    { id: 3, title: 'Title', description: 'Description' },
    { id: 4, title: 'Title', description: 'Description' },
    { id: 5, title: 'Title', description: 'Description' },
    { id: 6, title: 'Title', description: 'Description' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">See the Difference You're Making</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-1 bg-white border-none shadow-sm">
          <CardHeader className="p-4 pb-2">
            <h3 className="font-medium text-sm">{project.title}</h3>
            <div className="flex items-center mt-2">
              <div className="flex -space-x-2">
                {project.avatars.map((avatar, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={avatar} alt={`Team member ${index + 1}`} />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs ml-2">{project.teamInfo}</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {project.stats.map((stat, index) => (
              <p key={index} className="text-xs">
                {stat}
              </p>
            ))}
            <p className="text-xs font-medium mt-2">Testimonial:</p>
            <p className="text-xs mt-1">{project.testimonial.quote}</p>
            <p className="text-xs mt-1">{project.testimonial.author}</p>
            <p className="text-xs">{project.testimonial.role}</p>
          </CardContent>
        </Card>

        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="bg-white border-none shadow-sm">
              <CardHeader className="p-4 pb-2">
                <h3 className="font-medium text-sm">"Quote"</h3>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{quote.title}</p>
                    <p className="text-xs text-gray-500">{quote.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
