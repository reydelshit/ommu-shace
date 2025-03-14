import axiosInstance from './axiosInstance';

export type EventType = {
  id: string;
  eventName: string;
  description: string;
  tickets: string;
  isNeedApproval: string;
  capacity: number;
  location: string;
  markedLocation: string;
  startDate: string;
  endDate: string;
  tags: string;
  bannerPath: string;
  visibility: string;
  userId: string;
};

interface EventsResponse {
  events: EventType[];
}

export const createEventServiceFrontEnd = async (formData: FormData) => {
  return axiosInstance.post('/event/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAllEventsService = async (
  cursor?: string,
  pageSize = 10,
): Promise<EventsResponse> => {
  const { data } = await axiosInstance.post('/event', { cursor, pageSize });
  return data;
};
export const getSpecificEventService = async (eventId: string) => {
  const { data } = await axiosInstance.post(`/event/${eventId}`);
  return data.event;
};

export const updateEventServiceFrontEnd = async (
  formData: FormData,
  eventId: string,
) => {
  return axiosInstance.put(`/event/edit/${eventId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteEventService = async (eventId: string) => {
  return axiosInstance.delete(`/event/delte/${eventId}`);
};
