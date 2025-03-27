import axiosInstance from '@/api/axiosInstance';
import {
  attendEventService,
  createEventServiceFrontEnd,
  deleteEventService,
  getSpecificEventService,
  updateAttendanceStatusService,
  updateEventServiceFrontEnd,
} from '@/api/serviceEvent';
import { EventResponseAll, EventsWithAttendees } from '@/types/events';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createEventServiceFrontEnd(formData),
  });
};

export const useGetAllEventsWithoutPagination = () => {
  return useQuery<EventResponseAll>({
    queryKey: ['eventsWithoutPagination'],
    queryFn: async () => {
      console.log('Fetching all events...');
      const { data } = await axiosInstance.post<EventResponseAll>('/event');
      return data;
    },
    staleTime: 0,
  });
};
export const useGetAllEvents = () => {
  return useInfiniteQuery<EventResponseAll>({
    queryKey: ['events'],
    queryFn: async ({ pageParam = null }) => {
      console.log('Fetching events with cursor:', pageParam);
      const { data } = await axiosInstance.post<EventResponseAll>('/event/pagination', {
        cursor: pageParam,
        pageSize: 2,
      });
      return data ?? { events: [], nextCursor: null };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    initialPageParam: null,
    staleTime: 0,
  });
};

export const useGetSpecificEvent = (eventId: string, userId: string) => {
  return useQuery<{
    event: EventsWithAttendees;
    isUserAttending: boolean;
    isEventFull: boolean;
  }>({
    queryKey: ['events', eventId, userId],
    queryFn: () => getSpecificEventService(eventId, userId),
    enabled: !!eventId,
    select: (data) => ({
      event: data.event,
      isUserAttending: data.isUserAttending,
      isEventFull: data.isEventFull,
    }),
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: ({ formData, eventId }: { formData: FormData; eventId: string }) => updateEventServiceFrontEnd(formData, eventId),
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: (eventId: string) => deleteEventService(eventId),
  });
};

export const useAttendEvent = () => {
  return useMutation({
    mutationFn: async ({ eventId, userId, attendStatus }: { eventId: string; userId: string; attendStatus: string }) => {
      const { data } = await attendEventService(eventId, userId, attendStatus);
      return data;
    },
  });
};

export const useUpdateAttendanceStatus = () => {
  return useMutation({
    mutationFn: async ({ attendanceId, status, tags, eventId }: { attendanceId: string; status: string; tags?: string; eventId?: string }) => {
      return updateAttendanceStatusService(attendanceId, status, tags, eventId);
    },
  });
};

export const useAddCollaboration = () => {
  return useMutation({
    mutationFn: async (collabData: { eventId: string; collaboratorId: string; title: string; subtitle: string; email: string }) => {
      const { data } = await axiosInstance.post('/event/collaborations', collabData);
      return data;
    },
  });
};
