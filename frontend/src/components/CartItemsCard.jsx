import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setRemoveCartItem, setUpdateQuantity } from "../../redux/userSlice.js";
function CartItemsCard({ data }) {
  const dispatchRedux = useDispatch();
  const handleIncrease = (id, currQuantity) => {
    dispatchRedux(setUpdateQuantity({ id, quantity: currQuantity + 1 }));
  };

  const handleDecrease = (id, currQuantity) => {
    dispatchRedux(setUpdateQuantity({ id, quantity: currQuantity - 1 }));
  };
  return (
    <>
      <div className="flex w-full items-center mt-5 border py-2 px-4 rounded-2xl">
        <div className="flex gap-2 w-full">
          {data?.image && (
            <img
              src={data?.image}
              className="w-20 h-20 border border-amber-500 rounded-2xl"
            />
          )}

          <div className="font-fredoka">
            <h1 className="text-amber-600">{data?.name}</h1>
            <h1 className="text-gray-600 flex items-center">
              <BiRupee />
              {data?.price}x{data?.quantity}
            </h1>
            <h1 className="flex items-center font-medium font-sans">
              <BiRupee />
              {data?.price * data?.quantity}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <span
            className="bg-gray-200 rounded-full p-0.5"
            onClick={() => handleDecrease(data.id, data.quantity)}
          >
            <FiMinus size={30} />
          </span>
          <span>{data?.quantity}</span>
          <span
            className="bg-gray-200 rounded-full p-0.5"
            onClick={() => handleIncrease(data.id, data.quantity)}
          >
            <IoIosAdd size={30} />
          </span>
          <span
            className="text-orange-500"
            onClick={() => dispatchRedux(setRemoveCartItem(data.id))}
          >
            <MdDeleteOutline size={30} />
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemsCard;
