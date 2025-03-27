import { PrismaClient, ProjectCategory } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const categoryMapping: Record<string, ProjectCategory> = {
  'Civic Engagement and Responsibility':
    ProjectCategory.CIVIC_ENGAGEMENT_RESPONSIBILITY,
  'Collaboration and Engagement': ProjectCategory.COLLABORATION_ENGAGEMENT,
  'Economic Stability': ProjectCategory.ECONOMIC_STABILITY,
  'Education and Empowerment': ProjectCategory.EDUCATION_EMPOWERMENT,
  'Health and Well-being': ProjectCategory.HEALTH_WELLBEING,
  'Inclusivity and Diversity': ProjectCategory.INCLUSIVITY_DIVERSITY,
  'Social Connection and Support': ProjectCategory.SOCIAL_CONNECTION_SUPPORT,
  'Sustainability and Environmental Responsibility':
    ProjectCategory.SUSTAINABILITY_ENVIRONMENT,
  'Trust and Transparency': ProjectCategory.TRUST_TRANSPARENCY,
};

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
          collaborations: true,
          attendees: {
            include: {
              user: {
                select: {
                  id: true,
                  fullname: true,
                  profilePicture: true,
                  email: true,
                },
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
            user: true,
            attendees: {
              include: {
                user: {
                  select: {
                    id: true,
                    fullname: true,
                    profilePicture: true,
                    email: true,
                  },
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
          user: true,
          collaborations: true,
          attendees: {
            include: {
              user: {
                select: {
                  id: true,
                  fullname: true,
                  profilePicture: true,
                  email: true,
                },
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
        isUserAttending: userId
          ? event.attendees.some((attendee) => attendee.userId === userId)
          : false,
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
      const { userId, attendStatus } = req.body;

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { attendees: true },
      });

      if (!event) {
        res.status(404).json({ success: false, message: 'Event not found' });
        return;
      }

      if (event.attendees.some((a) => a.userId === userId)) {
        res
          .status(400)
          .json({ success: false, message: 'Already attending this event' });
        return;
      }

      if (event.attendees.length >= event.capacity) {
        res.status(400).json({ success: false, message: 'Event is full' });
        return;
      }

      await prisma.eventAttendees.create({
        data: { eventId, userId, status: attendStatus },
      });

      res
        .status(200)
        .json({ success: true, message: 'Successfully joined the event!' });
    } catch (error: any) {
      console.error('Error in attendEvent:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateAttendeeStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const { attendanceId } = req.params;
      const { status, tags, eventId } = req.body;

      if (!status) {
        res.status(400).json({ success: false, message: 'Status is required' });
        return;
      }

      const attendee = await prisma.eventAttendees.findUnique({
        where: { id: attendanceId },
      });
      if (!attendee) {
        res.status(404).json({ success: false, message: 'Attendee not found' });
        return;
      }

      // Update attendee status
      const updatedAttendee = await prisma.eventAttendees.update({
        where: { id: attendee.id, eventId: eventId },
        data: { status },
      });

      // console.log('tags:', tags);

      const tagArray = tags
        ? tags.split(',').map((tag: string) => tag.trim())
        : [];
      // Process tags and add Points
      if (tagArray.length > 0) {
        const validCategories = tagArray
          .map((tag: string) => categoryMapping[tag])
          .filter(
            (category: ProjectCategory | undefined) => category,
          ) as ProjectCategory[];

        console.log('Mapped categories:', validCategories);

        if (validCategories.length > 0) {
          // console.log('Attendee User ID:', attendee.userId);
          // console.log('Attendee Event ID:', attendee.eventId);

          const pointsData = validCategories.map((category) => ({
            userId: attendee.userId,
            eventId: attendee.eventId,
            points: 10,
            category,
          }));

          console.log('Points being inserted:', pointsData);

          await prisma.points.createMany({
            data: pointsData,
          });
        }
      }
      res.status(200).json({
        success: true,
        message: 'Attendee status updated!',
        status: updatedAttendee.status,
      });
    } catch (error: any) {
      console.error('Error in updateAttendeeStatus:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  addCollaboration: async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId, collaboratorId, title, subtitle, email } = req.body;

      if (!eventId || !collaboratorId || !title || !subtitle || !email) {
        res
          .status(400)
          .json({ success: false, message: 'Missing required fields' });
        return;
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        res.status(404).json({ success: false, message: 'Event not found' });
        return;
      }

      const existingCollab = await prisma.collaboration.findFirst({
        where: { eventId, collaboratorId: String(collaboratorId) },
      });

      if (existingCollab) {
        res.status(400).json({
          success: false,
          message: 'Already a collaborator for this event',
        });
        return;
      }

      const collaboration = await prisma.collaboration.create({
        data: {
          eventId,
          collaboratorId: String(collaboratorId),
          title,
          subtitle,
          email,
        },
      });

      res.status(201).json({
        success: true,
        message: 'Collaboration added successfully',
        data: collaboration,
      });
    } catch (error: any) {
      console.error('Error in addCollaboration:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
