import express from "express";
import { createEditShop, getMyShop, getShopByCity } from "../controllers/shop.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const shopRoute = express.Router();

shopRoute.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRoute.get("/get-my-shop", isAuth, getMyShop);
shopRoute.get("/get-my-shopCity/:city", isAuth, getShopByCity);


export default shopRoute;
