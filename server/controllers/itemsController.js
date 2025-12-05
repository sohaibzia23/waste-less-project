import Item from "../models/itemModel.js";

const homePage = async (req, res) => {
  res.send("homepage");
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "error fetching items" });
  }
};

const addItems = async (req, res) => {
  try {
    const item = new Item({
      title: req.body.title,
      expiryDate: req.body.expiryDate,
      location: req.body.location,
      quantity: req.body.quantity,
      category: req.body.category,
    });

    await item.save();
    console.log("item added");
    console.log(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    await Item.findByIdAndDelete(itemId);
    res.json("the item was deleted successfully");
  } catch (err) {
    console.error(err);
  }
};

export { homePage, getItems, addItems, deleteItem };
