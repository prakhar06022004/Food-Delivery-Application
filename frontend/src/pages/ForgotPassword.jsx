import { AiOutlineLeftCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[rgb(255,255,238)] w-full h-screen flex justify-center items-center p-2">
      <div className="px-3 py-5 font-extralight w-full max-w-md bg-white shadow-2xl rounded-2xl border-gray-100">
        <AiOutlineLeftCircle onClick={()=>navigate(-1)}
          size={23}
          className="cursor-pointer text-amber-500"
        />

        <h1 className="text-center text-2xl font-semibold text-[#444444]">
          Forgot Password
        </h1>

        <h1 className="text-center text-2xl mt-10 font-semibold text-[#444444]">
          Enter Email Address
        </h1>

        <div className="mt-5">
          <input
            className="border border-gray-400 focus:outline-none w-full px-2 py-2 rounded-2xl focus:border-amber-600 focus:ring-1 focus:ring-amber-300"
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address..."
          />
        </div>
        <Link to="/signin">
          <p className="text-[#ABABAB] text-center mt-2 cursor-pointer">
            Back to Sign in
          </p>
        </Link>
        <button className="w-full rounded-3xl border bg-gradient-to-r from-[#FF4B1F] to-[#FF9068] text-white text-[18px] py-2.5 mt-5 cursor-pointer">
          Send
        </button>

        <h1 className="text-center text-[#4444449c] my-2">Do you have an account?</h1>
                <button className="w-full rounded-3xl border-2 text-[#4444449c] text-[18px] font-semibold py-2.5 mt-5 cursor-pointer">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
