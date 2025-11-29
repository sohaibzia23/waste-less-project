import express from "express";
import { homePage, getItems, addItem } from "./controllers/itemsController.js";

const router = express.Router();

router.get("/", homePage);

router.get("/getItems", getItems);

router.post("/addItem/:title", addItem);

export default router;
