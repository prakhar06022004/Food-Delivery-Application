import express from "express";
import {signIn, signOut, signUp, sendOtp, verifyingOtp, resetPassword} from "../controllers/signup.js";
const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.get("/signout", signOut);
authRoute.post("/send-otp", sendOtp);
authRoute.post("/verifying-otp", verifyingOtp);
authRoute.post("/reset-password", resetPassword);
export default authRoute;