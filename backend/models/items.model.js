import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Veg", "NoN-Veg"],
    },
    category: {
      type: String,
      enum: [
        "Main Course",
        "Snacks",
        "Chinese",
        "Pizza",
        "Burgers",
        "North-Indian",
        "South-Indian",
        "Desserts",
        "Sandwiches",
        "Fast food",
        "Others",
      ],
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemsSchema);
export default Item;
