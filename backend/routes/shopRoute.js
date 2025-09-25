import express from "express";
import { createEditShop } from "../controllers/shop";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer";
const shopRoute = express.Router();

shopRoute.get("/create-edit", isAuth, upload.single("image") ,createEditShop);
export default shopRoute;
