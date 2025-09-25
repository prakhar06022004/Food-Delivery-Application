import Item from "../models/items.model";
import Shop from "../models/shopModel";
import uploadOnCloudinary from "../utils/cloudinary";

export const addItem = async () => {
  try {
    const { name, foodType, category, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ errors: { general: "Shop not found" } });
    }
    const item = await Item.create({
      name,
      foodType,
      category,
      price,
      image,
      shop: shop._id,
    });
    return res.status(201).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { general: "add item error", error } });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      { name, category, foodType, price, image },
      { new: true }
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error("Edit item error:", error);
    return res.status(500).json({ message: "Edit item error" });
  }
};
