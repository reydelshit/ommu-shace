import axiosInstance from '@/api/axiosInstance';
import {
  createEventServiceFrontEnd,
  deleteEventService,
  EventType,
  getSpecificEventService,
  updateEventServiceFrontEnd,
} from '@/api/eventServiceFrontend';
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
export const useGetSpecificEvent = (eventId: string) => {
  return useQuery<EventType>({
    queryKey: ['events', eventId],
    queryFn: () => getSpecificEventService(eventId),
    enabled: !!eventId, // Only run if eventId exists
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
