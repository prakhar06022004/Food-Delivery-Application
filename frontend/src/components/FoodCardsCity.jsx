import { PiDotOutlineFill } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCart } from "../../redux/userSlice";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
function FoodCardsCity({ data }) {
  const { cartItems } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const dispatchRedux = useDispatch();

  const handleIncrease = () => {
    if (quantity < 20) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const renderingStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar className="text-yellow-500 text-lg" />
        ) : (
          <FaRegStar className="text-yellow-500 text-lg" />
        )
      );
    }
    return stars;
  };
  renderingStars();
  console.log(data);
  return (
    <div className="w-[160px] sm:w-[220px] h-auto rounded-2xl overflow-hidden shadow-xl border border-amber-300">
      <div className="relative w-full h-auto flex flex-col justify-center items-center bg-white p-2 ">
        <div>
          <img
            src={data.image}
            alt={data.name}
            className="w-30 h-30 object-cover"
          />
        </div>
        <div className="absolute top-0 right-0">
          {data.foodType == "Veg" ? (
            <PiDotOutlineFill size={50} className="text-green-500" />
          ) : (
            <PiDotOutlineFill size={50} className="text-red-700" />
          )}
        </div>

        <div className="w-full text-[19px] relative text-amber-600 truncate rounded-3xl text-center mt-2">
          <h1 className="font-serif truncate shadow-lg bg-amber-50 rounded-2xl px-2">
            {data.name}
          </h1>
        </div>

        <div className="flex mt-2 w-full items-center justify-evenly">
          {renderingStars(data?.rating?.average || 0)}
          <span className="text-gray-700 text-[17px]">
            {data?.rating?.count}
          </span>
        </div>

        <div className="w-full flex justify-evenly items-center mt-4">
          <div>
            <p className="flex items-center shadow-lg rounded-2xl px-2 text-[18px]">
              <FaIndianRupeeSign size={15} />
              {data.price}
            </p>
          </div>
          <div className="flex w-[120px] h-[30px] border rounded-4xl items-center overflow-hidden ">
            {/* Left part: - 0 + */}
            <div className="flex justify-around items-center flex-1">
              <span
                className="text-[20px] cursor-pointer hover:bg-gray-200 rounded-full duration-200"
                onClick={handleDecrease}
              >
                <FiMinus />
              </span>
              <span className="text-[18px]">{quantity}</span>
              <span
                className="text-[20px] cursor-pointer hover:bg-gray-200 rounded-full duration-200"
                onClick={handleIncrease}
                
              >
                <IoIosAdd size={25}/>
              </span>
            </div>

            {/* Right part: Cart icon */}
            <div
              className={`${
                cartItems.some((i) => i.id === data._id)
                  ? "bg-gray-800"
                  : "bg-amber-500"
              } h-full px-1 py-2  text-white cursor-pointer flex items-center justify-center`}
              onClick={() =>
                dispatchRedux(
                  setAddToCart({
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    quantity,
                    foodType: data.foodType,
                    shop: data.shop,
                  })
                )
              }
            >
              <IoCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCardsCity;
