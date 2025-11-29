import mongoose from "mongoose";
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  title: String,
  expiryDate: { type: Date, required: true },
  location: {
    type: String,
    required: true,
    enum: ["Pantry", "Fridge", "Freezer"],
  },
  quantity: { type: Number, default: 1 },
  category: String,
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const item = mongoose.model("item", itemSchema);
