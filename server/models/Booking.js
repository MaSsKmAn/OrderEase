import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true,
  },
  bookingTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  specialRequests: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
