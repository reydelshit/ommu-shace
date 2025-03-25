import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const eventController = {
  createEvent: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        eventName,
        description,
        tickets,
        isNeedApproval,
        capacity,
        location,
        markedLocation,
        startDate,
        endDate,
        tags,
        visibility,
        userId,
      } = req.body;

      if (
        !eventName ||
        !description ||
        !tickets ||
        !capacity ||
        !location ||
        !startDate ||
        !endDate ||
        !tags ||
        !visibility ||
        !userId
      ) {
        res
          .status(400)
          .json({ success: false, message: 'All fields are required.' });
        return;
      }

      const bannerPath = `/uploads/${req?.file?.filename}`;

      const userExists = await prisma.event.findUnique({
        where: { id: userId },
      });
      if (userExists) {
        res
          .status(400)
          .json({ success: false, message: 'User already exists' });
        return;
      }

      const event = await prisma.event.create({
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

      res
        .status(201)
        .json({ success: true, message: 'Event created successfully.', event });
    } catch (error: any) {
      console.error('Error in createEvent:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllEvents: async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          attendees: {
            include: {
              user: {
                select: { id: true, fullname: true, profilePicture: true },
              },
            },
          },
        },
      });

      res.status(200).json({
        success: true,
        events, // Return all events
      });
    } catch (error: any) {
      console.error('Error in getAllEvents:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllEventsPagination: async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { cursor, pageSize = 2 } = req.body;
      const events =
        (await prisma.event.findMany({
          orderBy: { createdAt: 'desc' },
          take: pageSize,
          ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
          include: {
            user: { select: { fullname: true } },
            attendees: {
              include: {
                user: {
                  select: { id: true, fullname: true, profilePicture: true },
                },
              },
            },
          },
        })) || []; // Ensuring events is always an array

      const nextCursor =
        events.length > 0 ? events[events.length - 1].id : null;

      console.log('Fetched Events:', events);
      console.log('Next Cursor:', nextCursor);

      res.status(200).json({ success: true, events, nextCursor });
    } catch (error: any) {
      console.error('Error in getAllEvents:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getSpecificEvent: async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      const { userId } = req.query;
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          user: { select: { fullname: true } },
          attendees: {
            include: {
              user: {
                select: { id: true, fullname: true, profilePicture: true },
              },
            },
          },
        },
      });

      if (!event) {
        res.status(404).json({ success: false, message: 'Event not found' });
        return;
      }

      res.status(200).json({
        success: true,
        event,
        isUserAttending: event.attendees.some(
          (attendee) => attendee.userId === userId,
        ),
        isEventFull: event.attendees.length >= event.capacity,
      });
    } catch (error: any) {
      console.error('Error in getSpecificEvent:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateEvent: async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      const updateData = req.body;

      const event = await prisma.event.update({
        where: { id: eventId },
        data: { ...updateData },
      });

      res.status(200).json({ success: true, event });
    } catch (error: any) {
      console.error('Error in updateEvent:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteEvent: async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      await prisma.event.delete({ where: { id: eventId } });
      res
        .status(200)
        .json({ success: true, message: 'Event deleted successfully' });
    } catch (error: any) {
      console.error('Error in deleteEvent:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  attendEvent: async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      const { userId } = req.body;

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { attendees: true },
      });
      if (!event) throw new Error('Event not found');
      if (event.attendees.some((a) => a.userId === userId))
        throw new Error('Already attending this event');
      if (event.attendees.length >= event.capacity)
        throw new Error('Event is full');

      await prisma.eventAttendees.create({ data: { eventId, userId } });
      res
        .status(200)
        .json({ success: true, message: 'Successfully joined the event!' });
    } catch (error: any) {
      console.error('Error in attendEvent:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
