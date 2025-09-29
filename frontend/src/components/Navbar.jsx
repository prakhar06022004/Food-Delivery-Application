import { IoLocationSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { setUserData } from "../../redux/userSlice";
import { FaPlus } from "react-icons/fa6";
import { CiReceipt } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { shopData } = useSelector((state) => state.shop);
  const { userData, city } = useSelector((state) => state.user);
  const [popup, setPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const handleLogOut = () => {
    dispatchRedux(setUserData(null));
  };

  // Agar userData nahi hai to null return kar do
  if (!userData) return null;

  return (
    <div className="w-full h-[80px] fixed z-[999] flex md:justify-center justify-between items-center md:p-[30px] p-[10px] gap-[30px]">
      {userData.role === "user" ? (
        <h1 className="text-amber-500 font-bold text-3xl cursor-pointer">
          Prakhar
        </h1>
      ) : (
        <h1 className="text-amber-500 font-bold text-3xl cursor-pointer">
          Harsh
        </h1>
      )}

      {showSearch && userData.role === "user" && (
        <div className="w-[80%] h-[70px] bg-white shadow-lg rounded-lg flex items-center justify-center px-1.5 fixed top-[10%] left-[35px] sm:hidden">
          <div className="flex items-center gap-1 overflow-hidden w-[30%] border-r-2 border-gray-500">
            <IoLocationSharp size={23} color="orange" />
            <div className="text-[19px] w-[80%] truncate text-gray-700">
              {city}
            </div>
          </div>
          <div className="flex items-center justify-center border p-1 rounded-2xl w-full gap-2 ml-4 border-none">
            <IoIosSearch size={25} color="gray" />
            <input
              type="search"
              placeholder="Search delicious food....."
              className="outline-none w-full py-1.5"
            />
          </div>
        </div>
      )}
      {userData.role === "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-lg rounded-lg sm:flex hidden items-center px-1.5">
          <div className="flex items-center gap-1 overflow-hidden w-[30%] border-r-2 border-gray-500">
            <IoLocationSharp size={23} color="orange" />
            <div className="text-[19px] w-[80%] truncate text-gray-700">
              {city}
            </div>
          </div>
          <div className="flex items-center justify-center border p-1 rounded-2xl w-full gap-2 ml-4 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-300 border-none">
            <IoIosSearch size={25} color="gray" />
            <input
              type="search"
              placeholder="Search delicious food....."
              className="outline-none w-full py-1.5"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-[20px]">
        {userData.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={20}
              className="cursor-pointer text-amber-600 sm:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoIosSearch
              size={25}
              color="gray"
              className="md:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {userData.role === "owner" && shopData && (
          <>
            <button
              className="hidden sm:flex justify-center items-center bg-amber-600/10 py-1.5 px-2 rounded-3xl gap-1.5 text-amber-600 cursor-pointer"
              onClick={() => navigate("/add-item-shop")}
            >
              <FaPlus size={20} />
              Add Food Item
            </button>
            <button className=" sm:hidden justify-center items-center bg-amber-600/10 py-1.5 px-2 rounded-3xl gap-1.5 text-amber-600 cursor-pointer">
              <FaPlus size={24} />
            </button>
          </>
        )}
        {userData.role === "user" && (
          <div className="relative cursor-pointer">
            <IoCartOutline size={25} className="text-amber-500" />
            <span className="absolute right-[-3px] top-[-15px] text-amber-600">
              0
            </span>
          </div>
        )}
        {userData.role === "user" ? (
          <button className="hidden md:block cursor-pointer text-[17px] rounded-3xl py-1.5 px-2 text-amber-600 bg-amber-600/10 whitespace-nowrap">
            My Orders
          </button>
        ) : (
          <button className="flex items-center gap-1 cursor-pointer text-[17px] rounded-3xl py-1.5 px-2 text-amber-600 bg-amber-600/10 whitespace-nowrap">
            {/* Icon with badge (only for mobile) */}
            <span className="relative sm:hidden">
              <CiReceipt size={25} />
              <span className="absolute -top-2 -right-2 text-xs bg-amber-600 text-white rounded-full px-1">
                0
              </span>
            </span>

            <span className="relative hidden sm:flex">
              <span className="hidden sm:inline">
                <CiReceipt size={25} />
              </span>
              Pending Orders
              <span className="absolute -top-2 -right-3 text-xs bg-amber-600 text-white rounded-full px-1">
                0
              </span>
            </span>
          </button>
        )}

        <div
          className="flex justify-center items-center w-[40px] h-[40px] rounded-full text-white bg-amber-500 cursor-pointer select-none"
          onClick={() => setPopup((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>

        {popup && (
          <div className="fixed right-[3%] top-[10%] md:right-[5%] md:top-[10%] lg:right-[20%] shadow-lg flex flex-col gap-5 px-3 py-5 items-center bg-white">
            <div className="cursor-pointer font-medium">
              {userData.fullName}
            </div>
            <div className="md:hidden text-amber-500 font-semibold">
              My Orders
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <CiLogout className="cursor-pointer text-amber-500 font-semibold" />
              <button
                className="cursor-pointer text-amber-500 font-semibold"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
