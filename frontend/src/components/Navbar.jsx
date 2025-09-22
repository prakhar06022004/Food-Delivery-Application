import { IoLocationSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [popup, setPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="w-full h-[80px] fixed z-[999] flex md:justify-center justify-between items-center md:p-[30px] p-[10px] gap-[30px]">
      <h1 className="text-amber-500 font-bold text-3xl cursor-pointer">
        Prakhar
      </h1>
      {showSearch && (
        <div className="w-[80%] h-[70px] bg-white shadow-lg rounded-lg flex items-center justify-center px-1.5 fixed top-[10%] left-[35px] sm:hidden">
          <div className="flex items-center gap-1 overflow-hidden w-[30%] border-r-2 border-gray-500">
            <IoLocationSharp size={23} color="orange" />
            <div className="text-[19px] w-[80%] truncate text-gray-700">
              Ramnagar
            </div>
          </div>
          <div className="flex items-center justify-center border p-1 rounded-2xl w-full gap-2 ml-4 border-none">
            <IoIosSearch size={25} color="gray" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search delicious food....."
              className="outline-none w-full py-1.5"
            />
          </div>
        </div>
      )}

      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-lg rounded-lg sm:flex hidden items-center px-1.5">
        <div className="flex items-center gap-1 overflow-hidden w-[30%] border-r-2 border-gray-500">
          <IoLocationSharp size={23} color="orange" />
          <div className="text-[19px] w-[80%] truncate text-gray-700">
            Ramnagar
          </div>
        </div>
        <div className="flex items-center justify-center border p-1 rounded-2xl w-full gap-2 ml-4 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-300 border-none">
          <IoIosSearch size={25} color="gray" />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search delicious food....."
            className="outline-none w-full py-1.5"
          />
        </div>
      </div>

      <div className="flex items-center gap-[20px]">
        {showSearch ? (
          <RxCross2
            size={20}
            className="cursor-pointer  text-amber-600 sm:hidden"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoIosSearch
            size={25}
            color="gray"
            className="md:hidden cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}

        <div className="relative cursor-pointer ">
          <IoCartOutline size={25} className="text-amber-500" />
          <span className="absolute right-[-3px] top-[-15px] text-amber-600">
            0
          </span>
        </div>
        <button className="hidden md:block cursor-pointer text-[17px] border rounded-3xl p-1.5 text-amber-600 whitespace-nowrap">
          My Orders
        </button>
        <div
          className="flex justify-center items-center w-[40px] h-[40px] rounded-full text-white bg-amber-500 cursor-pointer select-none"
          onClick={() => setPopup((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>
        {popup && (
          <div className="fixed right-[3%] top-[10%] md:right-[5%] md:top-[10%] lg:right-[20%] shadow-lg flex flex-col gap-5 px-3 py-5 items-center">
            <div className="cursor-pointer font-medium ">
              {userData?.fullName}
            </div>
            <div className="md:hidden text-amber-500 font-semibold">
              My Orders
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <CiLogout className="cursor-pointer text-amber-500 font-semibold" />
              <button className="cursor-pointer text-amber-500 font-semibold">
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
