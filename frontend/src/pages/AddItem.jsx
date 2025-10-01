import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiRestaurantFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setShopData } from "../../redux/shopSlice";
import { HashLoader } from "react-spinners";
import axios from "axios";
const AddItem = () => {
  const { shopData } = useSelector((state) => state.shop);
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImg, setFrontendImg] = useState(null);
  const [backendImg, setBackendImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [foodType, setfoodType] = useState("");
  const cate = [
    "Main Course",
    "Snacks",
    "Chinese",
    "Pizza",
    "Burgers",
    "North-Indian",
    "South-Indian",
    "Desserts",
    "Sandwiches",
    "Fast food",
    "Others",
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", Number(price));
      formData.append("foodType", foodType);

      if (backendImg) {
        formData.append("image", backendImg);
      }
      const res = await axios.post(
        "http://localhost:8000/api/item/add-item",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // agar auth cookie chahiye
        }
      );
      dispatchRedux(setShopData(res?.data));
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sm:flex justify-center items-center p-6 min-h-screen relative bg-amber-100/10">
      <div className="absolute top-2 left-2.5 text-amber-600 cursor-pointer">
        <IoIosArrowRoundBack size={35} onClick={() => navigate("/")} />
      </div>
      <div className=" max-w-lg w-full shadow-lg p-5 bg-white border-orange-100 rounded-[10px]">
        <div className="flex flex-col justify-center items-center text-2xl font-medium">
          <RiRestaurantFill className="text-6xl bg-amber-500/10 p-3 rounded-full text-amber-600" />
          Add Food Items
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="foodName">Food Name</label>
            <input
              type="text"
              name="name"
              id="foodName"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
              placeholder="Enter Food Item"
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
            />
          </div>

          <div>
            <label htmlFor="image">Food Image</label>
            <input
              type="file"
              name="image"
              id="image"
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
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price || ""}
              placeholder="Enter Food Item"
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
            />
          </div>

          <div>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category || ""}
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300 text-gray-900"
            >
              <option value="cate" disabled>
                SELECT CATEGORY
              </option>
              {cate.map((category, index) => {
                return <option key={index}>{category}</option>;
              })}
            </select>
          </div>

          <div>
            <select
              onChange={(e) => setfoodType(e.target.value)}
              value={foodType || ""}
              className="w-full p-2 border-2 border-amber-300 rounded-[5px] outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300 text-gray-900"
            >
              <option value="" disabled>
                SELECT VEG / NON-VEG
              </option>
              <option value="Veg">Veg</option>
              <option value="NoN-Veg">Non-Veg</option>
            </select>
          </div>

          {loading ? (
            <button
              type="submit"
              className="w-full bg-amber-500 p-2 text-white rounded-[7px] mt-4 cursor-pointer flex justify-center items-center"
            >
              <HashLoader size={24} color="#fff" />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-amber-500 p-2 text-white rounded-[7px] mt-4 cursor-pointer"
            >
              Add Food Item
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddItem;
