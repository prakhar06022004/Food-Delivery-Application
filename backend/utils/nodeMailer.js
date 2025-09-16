import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Password",
    html: `<p>Your OTP for Password Reset is <strong>${otp}</strong>It will be expire in 5 minutes!</p>`,
  });
};
