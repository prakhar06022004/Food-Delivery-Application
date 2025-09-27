import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const uploadOnCloudinary = async (imgFile) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  try {
    const resultImg = await cloudinary.uploader.upload(imgFile);
    if (fs.existsSync(imgFile)) {
      fs.unlinkSync(imgFile);
    }
    return resultImg.secure_url;
  } catch (error) {
 if (fs.existsSync(imgFile)) {
      fs.unlinkSync(imgFile);
    }
        // throw error; // re-throw to catch in controller

  }
};

export default uploadOnCloudinary;
