import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
