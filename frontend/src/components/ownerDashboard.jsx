import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { MdArrowRight, MdArrowLeft, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiRestaurantFill } from "react-icons/ri";
import { FaKitchenSet } from "react-icons/fa6";
import OwnerShopItem from "./OwnerShopItem";
import useGetMyShop from "../hooks/useGetMyShop";
// import { useEffect, useState } from "react";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const { shopData } = useSelector((state) => state.shop);

  return (
    <>
      <Navbar />
      <div className="w-full h-[calc(100vh)] flex flex-col items-center px-3 pt-[80px] overflow-y-auto">
        {!shopData && (
          <div className="flex items-center justify-center p-4 sm:p-6 w-full">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/burgerShop.png"
                  alt="burgerImg"
                  className="w-36 h-36 mx-auto mb-3"
                  loading="lazy"
                />
                <h2 className="my-2 text-3xl font-bold text-amber-600">
                  Add Your Restaurant
                </h2>
                <p>
                  Join our food delivery platform and grow your business!
                  Register your shop today to reach more hungry customers,
                  manage your menu easily, and boost your sales with just a few
                  clicks.
                </p>
                <div className="flex items-center mt-5 gap-3">
                  <MdArrowRight className="text-amber-500 text-4xl" />
                  <button
                    className="bg-amber-500 rounded-full px-4 py-2 text-white font-medium hover:bg-amber-600 duration-200"
                    onClick={() => navigate("/create-edit-shop")}
                  >
                    Get Started
                  </button>
                  <MdArrowLeft className="text-amber-500 text-4xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {shopData && (
          <div className="w-full px-2 flex flex-col items-center gap-5">
            <h2 className="w-full text-4xl sm:text-5xl font-ceviche flex items-center justify-center gap-2 text-black text-center mt-5 shadow-md p-4 box-border">
              <RiRestaurantFill className="hidden sm:block sm:w-[35px] h-[35px] text-amber-600 " />
              WELCOME TO {shopData.name} BAKERY
            </h2>
            <div className="w-[90%] md:w-full max-w-2xl shadow-lg hover:shadow-xl duration-150 rounded-2xl overflow-hidden relative">
              <div
                className="absolute top-2 right-3 text-white bg-amber-500 rounded-full p-1 cursor-pointer shadow-md hover:bg-amber-600 transition-all duration-150"
                onClick={() => navigate("/create-edit-shop")}
              >
                <MdModeEdit className="text-[22px] sm:text-3xl" />
              </div>
              <img
                src={shopData.image}
                alt="shop"
                className="w-full h-40 sm:h-64 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h1 className="text-xl font-semibold sm:text-2xl mb-2 text-gray-800">
                  {shopData.name}
                </h1>
                <p className="text-gray-800 text-[17px] sm:text-xl mb-2">
                  {shopData.city}, {shopData.state}
                </p>
                <p className="text-gray-800 text-[17px] sm:text-xl mb-2">
                  {shopData.address}
                </p>
              </div>
            </div>
          </div>
        )}

        {shopData && shopData?.items?.length === 0 && (
          <div className="flex items-center justify-center p-4 sm:p-6 w-full mt-5">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <FaKitchenSet size={40} className="text-amber-600" />
                <h2 className="my-2 text-3xl font-bold text-amber-600">
                  Add Your Food Items
                </h2>
                <p>
                  Add your tasty dishes and let customers find their favorites!
                </p>
                <div className="flex items-center mt-5 gap-3">
                  <MdArrowRight className="text-amber-500 text-4xl" />
                  <button
                    className="bg-amber-500 rounded-full px-4 py-2 text-white font-medium hover:bg-amber-600 duration-200"
                    onClick={() => navigate("/add-item-shop")}
                  >
                    Add Items
                  </button>
                  <MdArrowLeft className="text-amber-500 text-4xl" />
                </div>
              </div>
            </div>
          </div>
        )}
        {shopData?.items?.length > 0 && (
          <div className="w-full max-w-3xl flex flex-col sm:flex-row flex-wrap p-2 shadow-xl gap-4 justify-center items-center relative">
            {shopData.items.map((foodItems, index) => (
              <OwnerShopItem key={index} data={foodItems} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
