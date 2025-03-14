import express from 'express';
import upload from '../middlewares/upload';
import { eventController } from '../controller/eventController';

const router = express.Router();

router.post('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getSpecificEvent);
router.post('/create', upload.single('banner'), eventController.createEvent);
router.put(
  '/edit/:eventId ',
  upload.single('banner'),
  eventController.updateEvent,
);
router.delete('/delete/:id', eventController.deleteEvent);

// attendEvent

router.post('/:eventId/attend', eventController.attendEvent);

export default router;
