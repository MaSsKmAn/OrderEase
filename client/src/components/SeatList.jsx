import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatList = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Fetch seats from backend
    axios.get('/api/seats')
      .then(response => {
        setSeats(response.data);
      })
      .catch(error => {
        console.error('Error fetching seats:', error);
      });
  }, []);

  const handleReserveSeat = (seatId) => {
    // Logic to reserve seat
    axios.post('/api/reserve', { seatId })
      .then(response => {
        console.log('Seat reserved:', response.data.message);
        // Refresh seats after reservation
        axios.get('/api/seats')
          .then(response => {
            setSeats(response.data);
          });
      })
      .catch(error => {
        console.error('Error reserving seat:', error);
      });
  };

  return (
    <div>
      <h2>Available Seats</h2>
      <ul>
        {seats.map(seat => (
          <li key={seat._id}>
            <div>{seat.location}</div>
            <div>Status: {seat.status}</div>
            {seat.status === 'available' && (
              <button onClick={() => handleReserveSeat(seat._id)}>Reserve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatList;

