import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtToken.js";
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email is already exist!" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 charaters!" });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile number should be at least 10 digits." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.log(`SignUp Error is: ${error.message}`);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    return res.status(500).json(`SignIn Error: ${error.message}`);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully!" });
  } catch (error) {
    return res.status(500).json(`SignOut error: ${error.message}`);
  }
};
