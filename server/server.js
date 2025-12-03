import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import items from "./routes/items.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB", error.message);
  });

app.use("/items", items);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
