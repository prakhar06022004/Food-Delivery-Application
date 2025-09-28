import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiRestaurantFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setShopData } from "../../redux/shopSlice";
import {HashLoader} from "react-spinners"
import axios from "axios";
const CreateEditShop = () => {
  const { shopData } = useSelector((state) => state.shop);
  const { city, state } = useSelector((state) => state.user);
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(shopData?.name || "");
  const [City, setCity] = useState(shopData?.city || city);
  const [State, setState] = useState(shopData?.state || state);
  const [address, setAddress] = useState(shopData?.address || "");
  const [frontendImg, setFrontendImg] = useState(shopData?.image || null);
  const [backendImg, setBackendImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", City);
      formData.append("state", State);
      formData.append("address", address);
      if (backendImg) {
        formData.append("image", backendImg);
      }
      const res = await axios.post(
        "http://localhost:8000/api/shop/create-edit",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // agar auth cookie chahiye
        }
      );
      dispatchRedux(setShopData(res.data));
      navigate("/");
      setLoading(false)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="sm:flex justify-center items-center p-6 min-h-screen relative ">
      <div className="absolute top-2 left-2.5 text-amber-600 cursor-pointer">
        <IoIosArrowRoundBack size={35} onClick={() => navigate("/")} />
      </div>
      <div className=" max-w-lg w-full shadow-lg p-5 bg-white border-orange-100 rounded-[10px]">
        <div className="flex flex-col justify-center items-center ">
          <RiRestaurantFill className="text-6xl bg-amber-500/10 p-3 rounded-full text-amber-600" />
          {shopData ? (
            <h2 className="font-medium text-2xl">Edit Shop</h2>
          ) : (
            <h2 className="font-medium text-2xl">Add Shop</h2>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="shopName"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
              placeholder="Enter Shop Name"
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
            />
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="name"
              accept="image/*"
              onChange={handleImage}
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
            />
            {frontendImg && (
              <div className="mt-2">
                <img
                  src={frontendImg}
                  alt=""
                  className="w-full h-[150px] object-cover object-center"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <div>
              <label htmlFor="city">city</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={City || ""}
                id="city"
                className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
              />
            </div>

            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={State || ""}
                id="state"
                className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Shop Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address || ""}
              id="address"
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
            />
          </div>
            {loading ?  <button
            type="submit"
            className="w-full bg-amber-500 p-2 text-white rounded-[7px] mt-4 cursor-pointer flex justify-center items-center"
          >
            <HashLoader size={24} color="#fff"/>
          </button> : <button
            type="submit"
            className="w-full bg-amber-500 p-2 text-white rounded-[7px] mt-4 cursor-pointer"
          >
            Save
          </button>}
         

        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
