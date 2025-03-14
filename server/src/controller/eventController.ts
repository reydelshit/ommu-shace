import { Request, Response } from 'express';
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getSpecificEventService,
  // getSpecificEventService,
  getUserById,
  updateEventService,
} from '../services/eventService';

export const createEventController = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
      res.status(400).json({
        success: false,
        message: 'All fields are required, including an image.',
      });
      return;
    }

    // Save banner path
    const bannerPath = `/uploads/${req?.file?.filename}`;

    const isUserExist = await getUserById(userId);

    if (isUserExist) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    const user = await createEventService(
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
      bannerPath,
      visibility,
      userId,
    );

    res
      .status(201)
      .json({ success: true, message: 'Event created successfully.', user });
  } catch (error: any) {
    console.error('Error in createEventController:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEventsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { cursor, pageSize = 2 } = req.body; // Extract cursor & pageSize

    const { events, nextCursor } = await getAllEventsService(cursor, pageSize);

    res.status(200).json({ success: true, events, nextCursor }); // Return cursor
  } catch (error: any) {
    console.error('Error in getAllEventsController:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSpecificEventController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { eventId } = req.params;
    console.log('eventId:', eventId);

    const event = await getSpecificEventService(eventId);

    console.log('event:', event);
    res.status(200).json({ success: true, event });
  } catch (error: any) {
    console.error('Error in getSpecificEventController:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { eventId } = req.params;
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
      res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
      return;
    }

    const event = await updateEventService(
      eventId,
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
    );

    res.status(200).json({ success: true, event });
  } catch (error: any) {
    console.error('Error in updateEventController:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEventController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const event = await deleteEventService(eventId);
    res.status(200).json({ success: true, event });
  } catch (error: any) {
    console.error('Error in deleteEventController:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
