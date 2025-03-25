import { BaseEvent } from '@/types/events';
import { randomColor } from '@/utils/randomColor';
import { User2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

const YourEventsViewCard = ({ event }: { event: BaseEvent }) => {
  return (
    <Link to={`/manage-event/${event.id}`} key={event.id} className="group relative">
      <div className="bg-white  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        {/* Event Banner */}
        <div
          className="h-36 w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              event.bannerPath && event.bannerPath !== 'null'
                ? `url(${import.meta.env.VITE_BACKEND_URL}${event.bannerPath})`
                : `linear-gradient(135deg, ${randomColor}, #6A5ACD)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Event Details */}
        <div className="p-4 space-y-3">
          <h2 className="text-xl font-bold text-gray-800 truncate">{event.eventName}</h2>

          <p className="text-sm text-gray-600 line-clamp-2 h-12">
            {event.description.slice(0, 100)}
            {event.description.length > 100 ? '...' : ''}
          </p>

          <div className="flex flex-col items-end">
            <p className="text-xs font-medium mb-4 flex items-center gap-2">
              <User2Icon className="h-4 w-4" /> {event?.attendees.filter((attend) => attend.status === 'APPROVED').length} / {event?.capacity}{' '}
              attendees
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-gray-500">Manage Event</span>
            </div>

            <Link to={`/event/${event.id}`} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View in event Page
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default YourEventsViewCard;
