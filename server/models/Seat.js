import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "reserved"],
    default: "available",
  },
});

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
