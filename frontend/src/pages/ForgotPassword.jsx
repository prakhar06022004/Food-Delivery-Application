import { AiOutlineLeftCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    // console.log("Email entered:", email)
    try {
      const fetchResult = await axios.post(
        "http://localhost:8000/api/auth/send-otp",
        { email },
        { withCredentials: true }
      );
      console.log(fetchResult.data);
      setLoading(false);

      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.errors);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);

    try {
      const fetchResult = await axios.post(
        "http://localhost:8000/api/auth/verifying-otp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(fetchResult);
      setLoading(false);

      setStep(3);
    } catch (err) {
      setError(err?.response?.data?.errors);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Password cannot be empty or spaces only!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password did not match!");
      return;
    }
    setLoading(true);

    try {
      const fetchResult = await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        { email, newPassword },
        { withCredentials: true }
      );
      setLoading(false);

      console.log(fetchResult);
      setSuccess(fetchResult.data);
      setTimeout(() => {
        setSuccess("");
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.errors);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[rgb(255,255,238)] w-full h-screen flex justify-center items-center p-2">
      <div className="px-3 py-5 font-extralight w-full max-w-md bg-white shadow-2xl rounded-2xl border-gray-100">
        <AiOutlineLeftCircle
          onClick={() => navigate(-1)}
          size={23}
          className="cursor-pointer text-amber-500"
        />

        {step === 1 && (
          <>
            <h1 className="text-center text-2xl font-semibold text-amber-500">
              Forgot Password
            </h1>

            <div className="mt-5">
              <input
                className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <p className="text-red-500 ">{err?.email}</p>
            <Link to="/signin">
              <p className="text-[#444444d1] text-center mt-2 cursor-pointer">
                Back to Sign in
              </p>
            </Link>
            <button
              className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={handleSendOtp}
            >
              {loading ? <HashLoader color="#f59e0b" size={25} /> : "Send Otp"}
            </button>
            <h1 className="text-center text-[#444444d1] my-2">
              Do you have an account?
            </h1>
            <button
              className="w-full rounded-3xl border-2 text-[#4444449c] text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-center text-2xl font-semibold text-amber-500">
              Verify OTP
            </h1>

            <div className="mt-5">
              <input
                className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
                type="text"
                name="verifyOtp"
                id="verifyOtp"
                placeholder="Enter Otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <p className="text-red-500 ">{err?.verifyOtp}</p>

            <Link to="/signin">
              <p className="text-[#444444d1] text-center mt-2 cursor-pointer">
                Back to Sign in
              </p>
            </Link>
            <button
              className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={handleVerifyOtp}
            >
              {loading ? <HashLoader color="#f59e0b" size={25} /> : " Verify "}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-center text-2xl font-semibold text-amber-500">
              Reset Password
            </h1>
            <div className="mt-5">
              <input
                className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300 mb-4"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <input
                className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
                type="password"
                name="password"
                id="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <p className="text-red-500">{err}</p>
            {/* <p className="text-red-500 mt-2">{err.general}</p> */}
            <Link to="/signin">
              <p className="text-[#444444d1] text-center mt-2 cursor-pointer">
                Back to Sign in
              </p>
            </Link>

            <p className="text-green-500 text-center text-[16px] font-medium mb-2">
              {success.message}{" "}
            </p>
            <button
              className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={handleResetPassword}
            >
              {loading ? <HashLoader color="#f59e0b" size={25} /> : " Reset "}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
