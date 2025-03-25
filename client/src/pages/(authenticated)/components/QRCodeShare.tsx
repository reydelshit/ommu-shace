import { EventType } from '@/types/events';
import { formatDate } from '@/utils/formatDate';
import { QRCodeCanvas } from 'qrcode.react';
import OMMULogo from '@/assets/LOGO.png';
import { Button } from '@/components/ui/button';

interface QRCodeShareProps {
  setShowQRCode: (show: boolean) => void;
  event: EventType;
}

export function QRCodeShare({ setShowQRCode, event }: QRCodeShareProps) {
  return (
    <div onClick={() => setShowQRCode(false)} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      {/* Ticket Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 w-full max-w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Event Banner */}
        {event.bannerPath && (
          <div className="h-40 bg-gray-200">
            <img src={`${import.meta.env.VITE_BACKEND_URL}${event.bannerPath}`} alt="Event Banner" className="h-full w-full object-cover" />
          </div>
        )}

        {/* Ticket Body */}
        <div className="p-6 flex flex-col">
          {/* Event Details */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{event.eventName}</h2>
            <p className="text-gray-600 text-sm mt-1 break-words">{event.description.slice(0, 50)}</p>
          </div>

          {/* Location & Date */}
          <div className="mt-4 text-center">
            <p className="font-semibold text-gray-700 text-lg">{event.location}</p>
            <p className="text-gray-500 text-sm mt-1">
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </p>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center items-center mt-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <QRCodeCanvas
                value={JSON.stringify({
                  eventID: event.id,
                  eventName: event.eventName,
                  userID: event.userId,
                })}
                size={228}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'H'}
                includeMargin={true}
                imageSettings={{
                  src: OMMULogo, // Your logo path
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true, // Keeps the logo visible
                }}
              />
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="border-dashed border-t-2 border-gray-300 my-6"></div>

          {/* Ticket Details */}
          <div className="text-center text-gray-700">
            <p>
              <strong>Tickets:</strong> {event.tickets}
            </p>
            <p>
              <strong>Capacity:</strong> {event.capacity}
            </p>
            <p>
              <strong>Approval Required:</strong> {event.isNeedApproval === 'true' ? 'Yes' : 'No'}
            </p>
          </div>

          {/* Share Button */}
          <Button className="mt-6 w-full py-3  transition cursor-pointer">Share Ticket</Button>
        </div>
      </div>
    </div>
  );
}
