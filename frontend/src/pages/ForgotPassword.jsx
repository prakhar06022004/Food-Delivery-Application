import { AiOutlineLeftCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Password cannot be empty or spaces only!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password did not match!");
      return;
    } else {
      alert("Password Reset Successfully!✅");
      navigate("/signin");
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
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email address..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <Link to="/signin">
              <p className="text-[#444444d1] text-center mt-2 cursor-pointer">
                Back to Sign in
              </p>
            </Link>
            <button
              className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={() => setStep(2)}
            >
              Send Otp
            </button>
            <h1 className="text-center text-[#444444d1] my-2">
              Do you have an account?
            </h1>
            <button className="w-full rounded-3xl border-2 text-[#4444449c] text-[18px] font-semibold py-2.5 mt-5 cursor-pointer">
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
                name="email"
                id="email"
                placeholder="Enter Otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <Link to="/signin">
              <p className="text-[#444444d1] text-center mt-2 cursor-pointer">
                Back to Sign in
              </p>
            </Link>
            <button
              className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={() => setStep(3)}
            >
              Verify
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
            {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
            <Link to="/signin">
              <p className="text-[#444444d1] text-center mt-2 cursor-pointer">
                Back to Sign in
              </p>
            </Link>
            <button
              className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] font-semibold py-2.5 mt-5 cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
