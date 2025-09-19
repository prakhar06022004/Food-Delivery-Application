import jwt from "jsonwebtoken";

const generateToken = async(userId) => {
    try {
    const token = await jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"7d"});
    return token
    } catch (error) {
        console.log(`Your error is: ${error.message}`);
    }
}
export default generateToken;
