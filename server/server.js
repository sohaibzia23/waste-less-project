import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import items from "./routes/items";

const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(express());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB", error.message);
  });

app.use("/items", items);
