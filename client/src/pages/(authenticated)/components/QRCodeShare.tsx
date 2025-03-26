import OMMULogo from '@/assets/LOGO.png';
import { Button } from '@/components/ui/button';
import { AttendeeType, EventsWithAttendees } from '@/types/events';
import { formatDate } from '@/utils/formatDate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRef, useState } from 'react';

interface QRCodeShareProps {
  setShowQRCode: (show: boolean) => void;
  userAttendance?: AttendeeType;
  userAttendanceId?: string;
  event: EventsWithAttendees;
}

export function QRCodeShare({ setShowQRCode, userAttendance, userAttendanceId, event }: QRCodeShareProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  console.log(event);

  const downloadAsPDF = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);

    try {
      // Options to improve html2canvas rendering
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 2, // Increase scale for better quality
        logging: false, // Disable logging
        allowTaint: true, // Allow cross-origin images
        removeContainer: true,
        backgroundColor: null, // Transparent background
        // Explicitly specify color parsing options
        onclone: (document) => {
          // Remove any problematic color functions
          const styleElements = document.querySelectorAll('style');
          styleElements.forEach((style) => {
            if (style.innerHTML.includes('oklch')) {
              style.innerHTML = style.innerHTML.replace(/oklch\([^)]*\)/g, '#000');
            }
          });
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${event.eventName}_ticket.pdf`);
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Failed to create PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsImage = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true,
        removeContainer: true,
        backgroundColor: null,
        onclone: (document) => {
          // Remove any problematic color functions
          const styleElements = document.querySelectorAll('style');
          styleElements.forEach((style) => {
            if (style.innerHTML.includes('oklch')) {
              style.innerHTML = style.innerHTML.replace(/oklch\([^)]*\)/g, '#000');
            }
          });
        },
      });

      const link = document.createElement('a');
      link.download = `${event.eventName}_ticket.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error creating image:', error);
      alert('Failed to create image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div onClick={() => setShowQRCode(false)} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      {/* Ticket Card */}
      <div
        ref={ticketRef}
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
                  attendanceId: userAttendanceId,
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
            <h1>{userAttendance?.user?.fullname}</h1>
            <p>@{userAttendance?.user?.email}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full my-4">Download</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={downloadAsPDF}>Download as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={downloadAsImage}>Download as Image</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
