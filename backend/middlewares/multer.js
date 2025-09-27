import multer from "multer";
import fs from "fs";
import path from "path";

const uploadFolder = path.join(process.cwd(),"public");
if(!fs.existsSync(uploadFolder)){
fs.mkdirSync(uploadFolder)
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
