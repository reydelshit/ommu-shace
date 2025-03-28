import { useSession } from '@/hooks/useSession';
import { Collaborator } from '@/lib/collaborator';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
export function LabTeams() {
  const { session } = useSession();

  const GRID_CLASSES: Record<string, { colSpan: Record<number, string>; rowSpan: Record<number, string> }> = {
    large: {
      colSpan: {
        4: 'col-span-4',
        2: 'col-span-2',
      },
      rowSpan: {
        3: 'row-span-3',
        8: 'row-span-8',
        20: 'row-span-20',
      },
    },
    medium: {
      colSpan: {
        2: 'col-span-2',
      },
      rowSpan: {
        2: 'row-span-2',
        16: 'row-span-16',
      },
    },
    small: {
      colSpan: {
        1: 'col-span-1',
      },
      rowSpan: {
        1: 'row-span-1',
      },
    },
    extrasmall: {
      colSpan: {
        1: 'col-span-1',
      },
      rowSpan: {
        4: 'row-span-4',
      },
    },
  };

  return (
    <div className="grid grid-cols-6 grid-rows-4 gap-4 w-full min-h-screen p-4">
      {Collaborator.map((card: any) => {
        // Safely get grid classes with fallback
        const colSpanClass = GRID_CLASSES[card.type]?.colSpan[card.gridConfig.colSpan] || 'col-span-1';
        const rowSpanClass = GRID_CLASSES[card.type]?.rowSpan[card.gridConfig.rowSpan] || 'row-span-1';

        return (
          <div
            key={card.id}
            className={cn(colSpanClass, rowSpanClass, card.backgroundColor, 'rounded-2xl relative overflow-hidden shadow-lg object-cover')}
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className={cn('text-white font-bold', card.type === 'large' || card.type === 'extra-small' ? 'text-xl' : 'text-xs')}>
                {card.title}
              </h3>
              <p className={cn('text-sm font-medium text-white', card.type === 'small' ? 'text-xs' : '')}>{card.subtitle}</p>
              <p className={cn('text-xs mt-1 opacity-80 text-white', card.type === 'small' ? 'text-xs' : '')}>{card.description}</p>

              {session && (
                <Link to={`/your-event`}>
                  <Button className={cn('bg-white text-black rounded-full hover:bg-gray-100 cursor-pointer', card.type === 'small' ? 'h-6' : '')}>
                    {card.buttonText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
