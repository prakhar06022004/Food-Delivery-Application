import Item from "../models/items.model.js";
import Shop from "../models/shopModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req,res) => {
  // console.log("File from multer:", req.file);

  try {
    const { name, foodType, category, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
      console.log(image);
    }

    const shop = await Shop.findOne({ owner: req.userId })
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

    shop.items.push(item._id)
    await shop.save(); 
    await shop.populate("items owner")
    console.log("Item Image URL:", item.image);
    

    return res.status(201).json(shop);
  } catch (error) {
  console.log("Add Item Error:", error);
  return res.status(500).json({ error: error.message, stack: error.stack });
}
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
      console.log(image);

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
