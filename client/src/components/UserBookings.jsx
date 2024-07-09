import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user bookings from backend
    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            <div>Seat: {booking.seatId.location}</div>
            <div>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</div>
            <div>Duration: {booking.duration} hours</div>
            <div>Special Requests: {booking.specialRequests}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;



