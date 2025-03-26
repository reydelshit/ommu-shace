import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdateAttendanceStatus } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { BaseEvent } from '@/types/events';
import { DefaultProfile } from '@/utils/defaultImages';
import { getAttendanceButtonColor } from '@/utils/getAttendanceButtonColor';
import { useQueryClient } from '@tanstack/react-query';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Registration = ({ eventData }: { eventData: BaseEvent }) => {
  const { eventId } = useParams<{ eventId: string }>() ?? '';
  const { user } = useSession();

  const updateAttendanceMutation = useUpdateAttendanceStatus();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');

  const updateAttendanceStatusRegister = (attendanceId: string, status: string) => {
    console.log('Updating attendance status register:', attendanceId, status);

    updateAttendanceMutation.mutate(
      { attendanceId, status, tags: eventData.tags, eventId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['events', eventId, user?.id] });

          toast('Attendance status updated successfully');
        },
        onError: (error) => {
          console.error('Error updating attendance status:', error);
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-2  flex-col ">
          <h2 className="text-4xl font-semibold">ATM</h2>
          {/* <Badge variant="secondary"></Badge> */}

          <h3 className="text-blue-500 font-semibold">
            {eventData.attendees.filter((attend) => attend.status === 'CHECKED_IN').length} GUEST CHECKED IN
          </h3>
          <p>{eventData.attendees.filter((attend) => attend.status === 'APPROVED').length} more guests are going</p>
        </div>

        <div className="w-[250px]">
          <Scanner
            allowMultiple
            onScan={(result) => {
              // console.log(result);

              const convertJson = JSON.parse(result[0].rawValue);

              console.log(convertJson);

              updateAttendanceStatusRegister(convertJson.attendanceId, 'CHECKED_IN');
            }}
          />
          {/* <Button>Scan Ticket</Button> */}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search guests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
      </div>

      <div className="bg-gray-50 rounded-lg">
        <ScrollArea className="h-[400px] w-full">
          <div className="p-4 space-y-2">
            {eventData.attendees.map((attendance) => (
              <div
                key={attendance.id}
                className={`flex items-center space-x-4 p-3  rounded-lg transition-colors ${
                  attendance.status === 'CHECKED_IN' ? 'bg-blue-400 hover:bg-blue-500 ' : 'hover:bg-white'
                }`}
              >
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={
                      attendance.user?.profilePicture && attendance.user?.profilePicture.trim() !== ''
                        ? `${import.meta.env.VITE_BACKEND_URL}${attendance.user?.profilePicture}`
                        : DefaultProfile
                    }
                  />
                  <AvatarFallback>
                    {attendance.user?.fullname
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{attendance.user?.fullname}</div>
                  <div className={`text-sm ${attendance.status === 'CHECKED_IN' ? 'text-white' : ''}`}>{attendance.user?.email}</div>
                </div>
                <Badge
                  className={`${getAttendanceButtonColor(attendance.status ?? '')}`}
                  variant={attendance.status === 'CHECKED_IN' ? 'default' : 'secondary'}
                >
                  {attendance.status === 'APPROVED' ? 'Expected Check-in ' : attendance.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Registration;
