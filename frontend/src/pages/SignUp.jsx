import { useState, useReducer } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { reducer, initialValue } from "./SignUpReducer";
import { auth } from "../firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { ClipLoader } from "react-spinners";
import HashLoader from "react-spinners/HashLoader";
import { setUserData } from "../../redux/userSlice.js";


const SignUp = () => {
  const [showRole, setShowRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const roles = ["user", "owner", "deliveryBoy"];
  const [err, setErr] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  const dispatchRedux = useDispatch();
  const fetching = async () => {
    setLoading(true);
    try {
      const fetchData = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          fullName: state.fullName,
          email: state.email,
          mobile: state.mobile,
          password: state.password,
          role: showRole,
        },
        { withCredentials: true }
      );
      dispatchRedux(setUserData(fetchData.data))
      // console.log(fetchData);
      setLoading(false);
      setErr({});
      setSuccess(fetchData.data); // backend se aa raha message
      setTimeout(() => {
        setSuccess("");
        // navigate("/signin");
      }, 1500);
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      setErr(error?.response?.data?.errors || {});
      setSuccess("");
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!state.mobile) {
      return alert("Mobile number is required!");
    } else if (state.mobile.length < 10) {
      return alert("Invalid mobile number!");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    setLoading(true);

    try {
      const finalData = await axios.post(
        "http://localhost:8000/api/auth/google-auth",
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role: showRole,
          mobile: state.mobile,
        },
        { withCredentials: true }
      );
            dispatchRedux(setUserData(finalData.data))

      setLoading(false);

      console.log(finalData);
      // console.log(result);
      setErr({});
    } catch (error) {
      setErr(error?.response?.data?.errors || {});
      setSuccess("");
      setLoading(false);
    }
  };
  return (
    <>
      {/* <div className="absolute inset-0 bg-[url('/BG4.jpg')] bg-cover bg-center "></div> */}

      <div className=" relative w-full h-screen flex justify-center items-center p-2 z-10 bg-[rgb(255,255,238)]">
        <div className="px-3 py-5 font-extralight w-full max-w-md bg-gray-100 shadow-2xl rounded-2xl border-gray-100">
          <h1 className="font-bold text-2xl mb-4 text-amber-500 cursor-pointer ">
            Prakhar👋
          </h1>
          <div>
            <p className="text-gray-600 text-start mb-5">
              Create your account and join us today!
            </p>
            <label className="font-light mx-1" htmlFor="fullname">
              Fullname
            </label>
            <div className="mb-1">
              <input
                className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
                type="text"
                name="fullName"
                id="fullname"
                placeholder="Enter your fullname..."
                onChange={handleChange}
                value={state.fullName}
                required
              />
            </div>
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
            <label className="font-light mx-1" htmlFor="mobile">
              Mobile
            </label>
            <div className="mb-1">
              <input
                className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your Mobile number..."
                onChange={handleChange}
                value={state.mobile}
                required
              />
            </div>
            <p className="text-red-500">{err.mobile}</p>
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

          <div>
            <label className="font-light mx-1" htmlFor="role">
              Select Role:
            </label>
            <div className="mb-1">
              <div className=" w-full flex justify-around items-center my-3 ">
                {roles.map((role, idx) => (
                  <button
                    className={`border border-gray-400 px-4 py-1 rounded-[5px] cursor-pointer shadow-lg font-semibold  ${
                      showRole === role
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    key={idx}
                    onClick={() => setShowRole(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-[#ff5100] py-2 rounded-[10px] text-white my-4 cursor-pointer font-medium"
            onClick={fetching}
          >
            {loading ? <HashLoader color="#f59e0b" size={25} /> : "Sign Up"}
          </button>
          <p className="text-green-500 text-center text-[16px] font-medium mb-2">
            {success.message}{" "}
          </p>
          <button
            className="flex justify-center items-center gap-2 py-1.5 cursor-pointer rounded-[10px] border w-full"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={22} />
            Sign Up with Google
          </button>
          <p
            className="text-center mt-2 hover:underline cursor-pointer font-normal text-gray-700"
            onClick={() => navigate("/signin")}
          >
            Already have an account? &nbsp;
            <span className="text-amber-600"> Sign In</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
