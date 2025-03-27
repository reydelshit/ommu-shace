import { useSession } from '@/hooks/useSession';
import { Collaborator } from '@/lib/collaborator';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
export function LabTeams() {
  const { session } = useSession();

  return (
    <div className="grid grid-cols-6 grid-rows-4 gap-4 w-full min-h-screen p-4">
      {Collaborator.map((card) => (
        <div
          key={card.id}
          className={`
            col-span-${card.gridConfig.colSpan} 
            row-span-${card.gridConfig.rowSpan} 
            ${card.backgroundColor} 
            rounded-2xl 
            relative 
            overflow-hidden
            shadow-lg
          `}
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className={`text-white font-bold ${card.type === 'large' || card.type === 'extra-small' ? 'text-xl' : 'text-xs'}`}>{card.title}</h3>
            <p className={`text-sm font-medium text-white ${card.type === 'small' ? 'text-xs' : ''}`}>{card.subtitle}</p>
            <p className={`text-xs mt-1 opacity-80 text-white ${card.type === 'small' ? 'text-xs' : ''}`}>{card.description}</p>

            {session && (
              <Link to={`/your-event`}>
                <Button className={`bg-white text-black rounded-full hover:bg-gray-100 cursor-pointer ${card.type === 'small' ? 'h-6' : ''}`}>
                  {card.buttonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
