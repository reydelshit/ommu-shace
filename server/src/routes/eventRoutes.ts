import express from 'express';
import upload from '../middlewares/upload';
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  // getSpecificEventController,
  updateEventController,
} from '../controller/eventController';

const router = express.Router();

router.post('/', getAllEventsController);
// router.post('/:id', getSpecificEventController);
router.post('/create', upload.single('banner'), createEventController);
router.put('/edit/:id', upload.single('banner'), updateEventController);
router.delete('/delete/:id', deleteEventController);

export default router;
