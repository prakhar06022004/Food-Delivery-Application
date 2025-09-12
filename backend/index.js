import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config()
const app = express();
const port = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});