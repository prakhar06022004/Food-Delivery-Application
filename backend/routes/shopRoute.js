import express from "express";
import { createEditShop, getMyShop } from "../controllers/shop";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer";
const shopRoute = express.Router();

shopRoute.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRoute.get("/get-my-shop", isAuth, getMyShop);

export default shopRoute;
