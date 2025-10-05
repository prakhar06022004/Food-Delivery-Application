import { PiDotOutlineFill } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";

function FoodCardsCity({ data }) {
    console.log(data);
  return (
    <div className="w-[150px] sm:w-[180px] h-auto rounded-2xl overflow-hidden shadow-xl border border-gray-300">
      <div className="relative w-full h-auto flex flex-col justify-center items-center bg-white p-2 ">
        <div>
        <img
          src={data.image}
          alt={data.name}
          className="w-30 h-30 object-cover transition-transform rounded-[10px] duration-200 hover:scale-110"
        />
        </div>
        <div className="absolute top-0 right-0"> {data.foodType == "Veg" ? (
          <PiDotOutlineFill size={50} className="text-green-500" />
        ) : (
          <PiDotOutlineFill size={50} className="text-red-700" />
        )}</div>
        
        <div className="w-full pl-4 shadow-lg pt-2 text-[19px] relative text-amber-600 ">
            <p className="absolute left-0 top-2 text-4xl text-gray-500">{"["}</p>
        <p className="font-semibold">{data.name}</p>
        <p className="flex items-center font-semibold"><FaIndianRupeeSign size={15}/>
{data.price}</p>
       </div>
      </div>
    </div>
  );
}

export default FoodCardsCity;
