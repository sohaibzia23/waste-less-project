import express from "express";
import {
  homePage,
  getItems,
  addItems,
} from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", homePage);

router.get("/getItems", getItems);

router.use(getItems);

router.post("/addItem", addItems);

router.use(addItems);

export default router;
