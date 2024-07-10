// server/index.js
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";
import SeatRoutes from "./routes/Seat.js";
import PaymentRoutes from "./routes/paymentRoutes.js" // Import payment routes
import Razorpay from "razorpay";

const PORT = process.env.PORT || 8080;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/api/user", UserRoutes);
app.use("/api/food", FoodRoutes);
app.use("/api/seats", SeatRoutes);
app.use("/api/payment", PaymentRoutes); // Use payment routes

// Razorpay initialization
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect with MongoDB");
    console.error(error);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
