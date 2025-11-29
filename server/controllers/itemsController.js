import items from "./models/items.js";

const homePage = async (req, res) => {
  res.send("homepage");
};

const getItems = async (req, res) => {
  res.send("items");
};

const addItems = async (req, res) => {
  res.send("item added");
};

export default { homePage, getItems, addItems };
