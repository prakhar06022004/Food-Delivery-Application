import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import CartItemsCard from "../components/CartItemsCard";
function CartPage() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]">
      <div className="w-full h-screen max-w-6xl shadow-lg flex flex-col gap-5 p-2">
        <div className="text-lg">
          <div className="text-amber-600 cursor-pointer flex items-center">
            <IoIosArrowRoundBack size={35} onClick={() => navigate("/")} />
            <h1 className="font-fredoka text-black">Your Cart</h1>
          </div>
          <div className="text-center">
            {cartItems?.length === 0 ? (
              <p className="text-gray-900">Your Cart Is Empty!</p>
            ) : (
              <div className="">
                {cartItems?.map((cartItem, index) => (
                  <CartItemsCard key={index} data={cartItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
