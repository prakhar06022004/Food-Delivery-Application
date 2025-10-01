import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addItem,
  deleteItemById,
  editItem,
  getItemById,
} from "../controllers/item.js";
import { upload } from "../middlewares/multer.js";
const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-by-id/:itemId", isAuth, getItemById);
itemRouter.get("/delete-item/:itemId", isAuth, deleteItemById);

export default itemRouter;
