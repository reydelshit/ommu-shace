import axiosInstance from '@/api/axiosInstance';
import {
  attendEventService,
  createEventServiceFrontEnd,
  deleteEventService,
  getSpecificEventService,
  updateEventServiceFrontEnd,
} from '@/api/serviceEvent';
import { EventType } from '@/types/events';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

type EventsResponse = {
  events: EventType[];
  nextCursor?: string;
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createEventServiceFrontEnd(formData),
  });
};

export const useGetAllEvents = () => {
  return useInfiniteQuery<EventsResponse>({
    queryKey: ['events'],
    queryFn: async ({ pageParam = null }) => {
      console.log('Fetching events with cursor:', pageParam);
      const { data } = await axiosInstance.post<EventsResponse>('/event', {
        cursor: pageParam,
        pageSize: 2,
      });
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    initialPageParam: null,
    staleTime: 0,
  });
};

export const useGetSpecificEvent = (eventId: string, userId: string) => {
  return useQuery({
    queryKey: ['events', eventId, userId],
    queryFn: () => getSpecificEventService(eventId, userId),
    enabled: !!eventId && !!userId,
    select: (data) => ({
      event: data.event,
      isUserAttending: data.isUserAttending,
      isEventFull: data.isEventFull,
    }),
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: ({
      formData,
      eventId,
    }: {
      formData: FormData;
      eventId: string;
    }) => updateEventServiceFrontEnd(formData, eventId),
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: (eventId: string) => deleteEventService(eventId),
  });
};

export const useAttendEvent = () => {
  return useMutation({
    mutationFn: async ({
      eventId,
      userId,
    }: {
      eventId: string;
      userId: string;
    }) => {
      const { data } = await attendEventService(eventId, userId);
      return data;
    },
  });
};
