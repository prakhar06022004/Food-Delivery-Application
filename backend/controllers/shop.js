import Shop from "../models/shopModel.js";
import uploadCloudinary from "../utils/cloudinary.js";
export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    let shop = await Shop.findOne({ owner: req.userId });
        let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }
     else if (shop) {
  image = shop.image; // existing image retain
}
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

    await shop.populate("owner items");
    return res.status(201).json(shop);
  } catch (error) {
     console.log(error);
    return res.status(500).json({ errors: { general: error } });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner items");
    if (!shop) {
      return null;
    }
    return res.status(200).json(shop);
  } catch (error) {
     console.log(error);
    return res.status(500).json({ errors: { general: error } });
  }
};
