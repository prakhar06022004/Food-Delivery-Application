import express from "express";
import { signIn, signOut, signUp } from "../controllers/signup.js";
const authRoute = express.Router();
authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.get("/signout", signOut);
export default authRoute;
