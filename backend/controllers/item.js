import Item from "../models/items.model.js";
import Shop from "../models/shopModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, foodType, category, price } = req.body;

    // Image upload
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
      console.log("Uploaded Image:", image);
    }

    // Shop check
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ errors: { general: "Shop not found" } });
    }

    // Create Item
    const item = await Item.create({
      name,
      foodType,
      category,
      price,
      image,
      shop: shop._id,
    });

    // Push item to shop
    shop.items.push(item._id);
    await shop.save();

    // Fetch updated shop with populated items sorted by updatedAt descending
    const updatedShop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } }, // latest first
      });

    // console.log("Item Image URL:", item.image);

    return res.status(201).json(updatedShop);
  } catch (error) {
    console.log("Add Item Error:", error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;

    // Image upload if new image is provided
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
      console.log("Updated Image:", image);
    }

    // Update item
    const item = await Item.findByIdAndUpdate(
      itemId,
      { name, category, foodType, price, ...(image && { image }) }, // only overwrite if new image
      { new: true }
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    // Fetch updated shop with items sorted by updatedAt descending
    const updatedShop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } },
      });

    return res.status(200).json(updatedShop);
  } catch (error) {
    console.error("Edit item error:", error);
    return res.status(500).json({ message: "Edit item error" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { general: "get item error", error } });
  }
};

export const deleteItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    const shop = await Shop.findOne({ owner: req.userId });
    shop.items = shop.items.filter((i) => i.toString() !== item._id.toString());
    await shop.save();
    await shop.populate({
      path: "items",
      options: {
        sort: { updatedAt: -1 },
      },
    });
    return res.status(200).json(shop);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { general: "delete item error", error } });
  }
};

export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      res.status(400).json({ mesage: "city is required" });
    }
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "shops not found" });
    }
    const shopIds = shops.map((shop, i) => shop._id);
    const items = await Item.find({ shop: { $in: shopIds } });
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { general: "get item by city error", error } });
  }
};
