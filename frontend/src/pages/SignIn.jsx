import { useState, useReducer } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { reducer, initialValue } from "./SignUpReducer";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  const fetching = async () => {
    try {
      const fetchData = await axios.post(
        "http://localhost:8000/api/auth/signin",
        {
          email: state.email,
          password: state.password,
        },
        { withCredentials: true }
      );
      setErr({});
      setSuccess(fetchData.data);
      setTimeout(() => {
        setSuccess("");
      }, 1500);
      console.log(fetchData);
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      setErr(error.response?.data?.errors);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    try {
      const finalData = await axios.post(
        "http://localhost:8000/api/auth/google-auth",
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      console.log(finalData);
      // console.log(result);
    } catch (error) {
      setErr(error.response?.data?.errors);
    }
  };
  return (
    <div className="bg-[rgb(255,255,238)] w-full h-screen flex justify-center items-center p-2">
      <div className="px-3 py-5 font-extralight w-full max-w-md bg-white shadow-2xl rounded-2xl border-gray-100">
        <h1 className="font-bold text-2xl mb-4 text-amber-500 cursor-pointer ">
          Prakhar👋
        </h1>
        <div>
          <p className="text-gray-600 text-start mb-5">
            Sign In and Order Your Delicious Food!
          </p>
        </div>

        <div>
          <label className="font-light mx-1" htmlFor="email">
            Email
          </label>
          <div className="mb-1">
            <input
              className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address..."
              onChange={handleChange}
              value={state.email}
              required
            />
          </div>
          <p className="text-red-500">{err.email}</p>
        </div>

        <div>
          <label className="font-light mx-1" htmlFor="password">
            Password
          </label>
          <div className="mb-1 relative">
            <input
              className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your Password..."
              onChange={handleChange}
              value={state.password}
              required
            />
            <button
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-red-500">{err.password}</p>
        </div>
        <p
          className="text-right font-light cursor-pointer text-gray-500 hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </p>
        <button
          type="button"
          className="w-full bg-[#ff5100] py-2 rounded-[10px] text-white my-4 cursor-pointer font-medium"
          onClick={fetching}
        >
          Sign In
        </button>
        <p className="text-green-500 text-center text-[16px] font-medium mb-2">
          {success.message}{" "}
        </p>
        <button
          className="flex justify-center items-center gap-2 py-1.5 cursor-pointer rounded-[10px] border w-full"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={22} />
          Sign In with Google
        </button>
        <p
          className="text-center mt-2 hover:underline cursor-pointer font-normal text-gray-700"
          onClick={() => navigate("/signup")}
        >
          Create an account? &nbsp;
          <span className="text-amber-600"> Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
