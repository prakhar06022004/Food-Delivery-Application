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
    fs.unlinkSync(imgFile);
    return resultImg.secure_url;
  } catch (error) {
    fs.unlinkSync(imgFile);
    console.log(error);
  }
};

export default uploadOnCloudinary;
