import express from "express";
import { createEditShop } from "../controllers/shop";
import isAuth from "../middlewares/isAuth";
const shopRoute = express.Router();

shopRoute.get("/create-edit", isAuth, createEditShop);
export default shopRoute;
