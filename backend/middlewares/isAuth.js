import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const isAuth = async (req, res, next) => {
  try {
const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ errors: { tokenErr: "token not found" } });
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken) {
      return res
        .status(400)
        .json({ errors: { decodetokenErr: "token not verify" } });
    }
    console.log(decodeToken);
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "isAuth Error: " + error.message,
      },
    });
  }
};
export default isAuth;
