import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true },
  // Add other fields as necessary
});

export default mongoose.model("Product", ProductSchema);
