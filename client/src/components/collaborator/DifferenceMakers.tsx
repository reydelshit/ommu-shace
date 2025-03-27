import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Reydel from '@/assets/profiles/Reydel.jpg';
import { Quote } from 'lucide-react';

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
    <div className="container mx-auto px-4 ">
      <h2 className="text-2xl font-bold mb-[8rem] text-center font-boldonse">See The Difference You're Making</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="md:col-span-1 bg-white rounded-xl shadow-md p-6 
        transition-all duration-300 hover:shadow-lg"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-3 font-boldonse">{project.title}</h3>

            {/* Team Avatars */}
            <div className="flex items-center mb-4">
              <div className="flex -space-x-2">
                {project.avatars.map((avatar, index) => (
                  <Avatar key={index} className="h-8 w-8 border-2 border-white">
                    <AvatarImage className="object-cover" src={Reydel} alt={`Team member ${index + 1}`} />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-3">{project.teamInfo}</span>
            </div>

            {/* Project Stats */}
            <div className="space-y-2 mb-4">
              {project.stats.map((stat, index) => (
                <p key={index} className="text-sm text-gray-600 font-bold">
                  {stat}
                </p>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs italic text-gray-700 mb-2">"{project.testimonial.quote}"</p>
              <div className="text-xs">
                <p className="font-semibold text-gray-800">{project.testimonial.author}</p>
                <p className="text-gray-500">{project.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-xl shadow-sm p-6 
                       transition-all duration-300 
                       hover:shadow-lg hover:-translate-y-2"
            >
              <div className="flex items-start mb-4">
                <Quote className="w-5 h-5 text-black mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-700 italic">"{quote.title}"</p>
              </div>

              <div className="flex items-center mt-4">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={Reydel || '/placeholder.svg?height=40&width=40'} alt="Quote Avatar" />
                  <AvatarFallback>{quote.title[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{quote.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
