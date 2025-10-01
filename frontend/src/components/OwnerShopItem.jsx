import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShopData } from "../../redux/shopSlice";
import axios from "axios";
const OwnerShopItem = ({ data }) => {
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const handleDeleteItem = async (itemId) => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/item/delete-item/${data._id}`,{withCredentials:true}
      );
      dispatchRedux(setShopData(result?.data))
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" flex sm:w-[48%] w-full shadow-md overflow-hidden mt-5 p-2 items-center justify-center rounded-2xl relative">
        <div className="flex relative gap-5 py-2 pr-full border shadow-lg px-2 rounded-2xl border-amber-600 w-full">
          <div
            className="absolute top-1 right-1 bg-amber-500 rounded-full p-2 w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => navigate(`/edit-item-shop/${data._id}`)}
          >
            <MdModeEdit size={40} className="text-white " />
          </div>
          <div className="absolute top-[45px] right-1 bg-amber-500 rounded-full p-2 w-8 h-8 flex items-center justify-center cursor-pointer" onClick={handleDeleteItem}>
            <MdDelete size={40} className="text-white " />
          </div>

          <img
            src={data?.image}
            alt={data?.name}
            className="w-20 h-20 object-cover rounded border self-center"
          />
          <div className="">
            <p className="text-amber-600 text-[18px]">{data?.name}</p>
            <p>
              <span className="font-semibold">Category:</span> {data?.category}
            </p>
            <p>
              <span className="font-semibold">Food Type: </span>
              {data?.foodType}
            </p>
            <p>
              <span className="font-semibold">Price: </span> {data?.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerShopItem;
