import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingForm.css'; // Import CSS file for additional styling

const BookingForm = () => {
  const [seatId, setSeatId] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [message, setMessage] = useState('');
  const [availableSeats, setAvailableSeats] = useState(20);

  useEffect(() => {
    // Fetch the initial number of available seats from the server
    axios.get('/api/available-seats')
      .then(response => {
        setAvailableSeats(response.data.availableSeats);
      })
      .catch(error => {
        console.error('Error fetching available seats:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to create booking
    axios.post('/api/booking', { seatId, bookingTime, duration, specialRequests })
      .then(response => {
        console.log('Booking created:', response.data.message);
        setMessage('Booking created successfully!');
        // Clear form fields after successful booking
        setSeatId('');
        setBookingTime('');
        setDuration('');
        setSpecialRequests('');
        // Update available seats
        setAvailableSeats(prevSeats => prevSeats - 1);
      })
      .catch(error => {
        console.error('Error creating booking:', error);
        setMessage('Failed to create booking. Please try again.');
      });
  };

  return (
    <div className="container mt-5" style={{borderRadius:"10px",backgroundColor:"#a0d5f7",padding:"10px"}}>
      <div className="row">
        <div className="col" >
          <h2 style={{backgroundColor:"#8ed0f9",padding:"10px",width:"fit-content",borderRadius:"10px"}}>Book a Seat</h2>
          <p>Available Seats: {availableSeats}</p>
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Seat ID:</label>
              <input type="text" className="form-control" value={seatId} onChange={(e) => setSeatId(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Booking Time:</label>
              <input type="datetime-local" className="form-control" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Duration (hours):</label>
              <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Special Requests:</label>
              <textarea className="form-control" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={availableSeats === 0}>Book Now</button>
            {message && <p className="mt-3 message">{message}</p>}
          </form>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgH64g8lQyiszJ8JN-QQNT3UlvMkQJRIPSpw&s"
            alt="Booking"
            className="img-fluid"
            style={{ height: '100%', objectFit: 'contain',margin:"0px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

