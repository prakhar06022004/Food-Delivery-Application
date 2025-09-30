import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtToken.js";
import { sendMail } from "../utils/nodeMailer.js";
export const signUp = async (req, res) => {
  // console.log("SignUp API hit hua ✅", req.body);
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: {
          email: "This Email is already exist",
        },
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        errors: {
          password: "Password must be atleast 8 characters",
        },
      });
    }
    if (mobile.length < 10) {
      return res.status(400).json({
        errors: {
          mobile: "Mobile number should be at least 10 digits.",
        },
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({ message: "User Registered Successfully!✅",user});
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "SignUp Error" + error.message,
      },
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: {
          general: "This email does not exist",
        },
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: {
          general: "Incorrect Password",
        },
      });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login successful!✅", user });
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "SignIn Error" + error.message,
      },
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully!" });
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "SignOut Error" + error.message,
      },
    });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: {
          email: "Email does not exist",
        },
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.expireOtp = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "Otp sent successfully!" });
  } catch (error) {
    return res.status(500).json({
      errors: {
        email: "Send OTP Error " + error.message,
      },
    });
  }
};

export const verifyingOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.expireOtp < Date.now()) {
      return res.status(400).json({
        errors: {
          verifyOtp: "Invalid / Expired Otp",
        },
      });
    }
    user.isOtpVerified = true;
    user.expireOtp = undefined;
    user.resetOtp = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP Verify Successfully✅" });
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "Verify Otp Error" + error.message,
      },
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP Verification required" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully✅" });
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "Reset Password Error " + error.message,
      },
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { email, fullName, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ message: "Google Auth successful!", user });
  } catch (error) {
    return res.status(500).json({
      errors: {
        general: "Something went wrong! " + error.message,
      },
    });
  }
};
