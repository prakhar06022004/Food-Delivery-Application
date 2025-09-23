import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    try {
    const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"7d"});
    return token
    } catch (error) {
        console.log(`Your error is: ${error.message}`);
    }
}
export default generateToken;
