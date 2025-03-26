import { EventType } from '@/types/events';
import axiosInstance from './axiosInstance';

interface EventsResponse {
  events: EventType[];
}

export const createEventServiceFrontEnd = async (formData: FormData) => {
  return axiosInstance.post('/event/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAllEventsService = async (cursor?: string, pageSize = 10): Promise<EventsResponse> => {
  const { data } = await axiosInstance.post('/event', { cursor, pageSize });
  return data;
};

export const getSpecificEventService = async (eventId: string, userId: string) => {
  const { data } = await axiosInstance.get(`/event/${eventId}`, {
    params: { userId },
  });
  return data;
};

export const updateEventServiceFrontEnd = async (formData: FormData, eventId: string) => {
  return axiosInstance.put(`/event/edit/${eventId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteEventService = async (eventId: string) => {
  return axiosInstance.delete(`/event/delete/${eventId}`);
};

export const attendEventService = async (eventId: string, userId: string, attendStatus: string) => {
  return axiosInstance.post(`/event/${eventId}/attend`, { userId, attendStatus });
};

export const updateAttendanceStatusService = async (attendanceId: string, status: string, tags?: string, eventId?: string) => {
  const { data } = await axiosInstance.put(`/event/update-status/${attendanceId}`, { status, tags, eventId });
  return data;
};
