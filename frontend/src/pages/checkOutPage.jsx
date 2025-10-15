import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { TbCurrentLocation } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";

function CheckOutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="text-amber-600 cursor-pointer absolute sm:top-5 sm:left-5 top-2 left-2">
        <IoIosArrowRoundBack size={40} onClick={() => navigate("/")} />
      </div>
      <div className="w-full max-w-3xl shadow-xl p-5 rounded-2xl space-y-5">
        <h1 className="font-fredoka font-medium text-[18px] ">CheckOut</h1>
        {/* location section */}
        <section>
          <h1 className="flex items-center gap-1">
            <FaLocationDot className="text-amber-600" size={24} />
            Delivery Location
          </h1>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Enter your delivery location..."
              className="w-full border-gray-200 py-2 px-3 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-300 rounded-2xl border-[1px]"
            />
            <button className="flex justify-center items-center w-[50px] bg-amber-600 text-white rounded-xl cursor-pointer hover:bg-amber-700 duration-100">
              <IoIosSearch size={25} />
            </button>
            <button className="text-gray-700 cursor-pointer">
              <TbCurrentLocation size={27} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOutPage;
