import Shop from "../models/shopModel.js";
import uploadCloudinary from "../utils/cloudinary.js";
export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }
    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        address,
        state,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          address,
          state,
          image,
          owner: req.userId,
        },
        { new: true }
      );
    }

    await shop.populate("owner");
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ errors: { general: error } });
  }
};

