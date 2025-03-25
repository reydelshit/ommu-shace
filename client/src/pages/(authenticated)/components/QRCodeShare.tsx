import { EventType } from '@/types/events';
import { formatDate } from '@/utils/formatDate';
import { QrCode } from 'lucide-react';

interface QRCodeShareProps {
  setShowQRCode: (show: boolean) => void;
  event: EventType;
}

export function QRCodeShare({ setShowQRCode, event }: QRCodeShareProps) {
  return (
    <div onClick={() => setShowQRCode(false)} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <span className="absolute top-4 right-4 text-white">Press anywhere to close the modal</span>

      <div onClick={(e) => e.stopPropagation()} className="relative z-20 p-6 h-[420px] flex flex-col bg-white rounded-lg w-[420px]">
        <div className="flex-1">
          <h2 className="text-[#00FF00] text-2xl font-bold mb-2">{event.eventName}</h2>

          <div className="flex items-center text-white/80 mb-4">
            <span>{event.location}</span>
          </div>

          {/* QR Code */}
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-32 bg-[#00FF00]/20 rounded-lg flex items-center justify-center">
              <QrCode className="w-24 h-24 text-[#00FF00]" />
            </div>
          </div>
        </div>

        {/* Date Display */}
        <div className="mt-auto">
          <div className="bg-[#00FF00]/10 rounded-lg p-4">
            <p className="text-[#00FF00] text-center font-medium">{formatDate(event.startDate)}</p>
          </div>
        </div>

        {/* Share button */}
        <button className="w-full mt-4 py-3 bg-[#00FF00]/20 text-[#00FF00] rounded-lg hover:bg-[#00FF00]/30 transition-colors">Share</button>
      </div>
    </div>
  );
}
