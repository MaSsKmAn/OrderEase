import express from 'express';
import { createBooking, getAvailableSeats } from '../controllers/Seat.js';

const router = express.Router();

router.post('/booking', createBooking);
router.get('/available-seats', getAvailableSeats);

export default router;
