import express from "express";
import {
  homePage,
  getItems,
  addItems,
  deleteItem,
} from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", homePage);

router.get("/getItems", getItems);

router.post("/addItem", addItems);

router.delete("/deleteItem/:id", deleteItem);

export default router;
