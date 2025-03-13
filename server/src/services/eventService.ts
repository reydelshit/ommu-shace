import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEventService = async (
  eventName: string,
  description: string,
  tickets: string,
  isNeedApproval: string,
  capacity: number,
  location: string,
  markedLocation: string,
  startDate: string,
  endDate: string,
  tags: string,
  bannerPath: string,
  visibility: string,
  userId: string,
) => {
  return prisma.event.create({
    data: {
      eventName,
      description,
      tickets,
      isNeedApproval,
      capacity: Number(capacity),
      location,
      markedLocation,
      startDate,
      endDate,
      tags,
      bannerPath,
      visibility,
      userId,
    },
  });
};

export const getUserById = async (userId: string) => {
  return prisma.event.findUnique({ where: { id: userId } });
};

export const getAllEventsService = async (cursor?: string, pageSize = 2) => {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
    take: pageSize, // Limit to 2
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}), // Skip cursor item
  });

  console.log('Fetched events count:', events.length); // Debugging
  console.log(
    'Returning events:',
    events.map((e) => e.id),
  ); // Show event IDs

  const nextCursor = events.length > 0 ? events[events.length - 1].id : null; // Get last event's ID

  return { events, nextCursor };
};

// export const getSpecificEventService = async (eventId: string) => {
//   return prisma.event.findUnique({ where: { id: eventId } });
// };

export const updateEventService = async (
  eventId: string,
  eventName?: string,
  description?: string,
  tickets?: string,
  isNeedApproval?: string,
  capacity?: number,
  location?: string,
  markedLocation?: string,
  startDate?: string,
  endDate?: string,
  tags?: string,
  bannerPath?: string,
  visibility?: string,
) => {
  return prisma.event.update({
    where: { id: eventId },
    data: {
      ...(eventName && { eventName }),
      ...(description && { description }),
      ...(tickets && { tickets }),
      ...(isNeedApproval && { isNeedApproval }),
      ...(capacity && { capacity: Number(capacity) }),
      ...(location && { location }),
      ...(markedLocation && { markedLocation }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(tags && { tags }),
      ...(bannerPath && { bannerPath }),
      ...(visibility && { visibility }),
    },
  });
};

export const deleteEventService = async (eventId: string) => {
  return prisma.event.delete({ where: { id: eventId } });
};
