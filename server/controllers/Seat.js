let availableSeats = 20;

// Create a new booking
export const createBooking = (req, res) => {
  if (availableSeats > 0) {
    availableSeats -= 1;
    res.json({ message: 'Booking created successfully' });
  } else {
    res.status(400).json({ message: 'No available seats' });
  }
};

// Get available seats
export const getAvailableSeats = (req, res) => {
  res.json({ availableSeats });
};
