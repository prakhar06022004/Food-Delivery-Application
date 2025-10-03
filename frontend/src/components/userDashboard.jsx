import Navbar from "./Navbar";
import { categories } from "../category";
import CategoryCards from "./categoryCards";

const UserDashboard = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />
      <div className="w-full max-w-6xl shadow-lg flex flex-col gap-5 items-start p-[10px] pt-[80px]">
        <h1 className="text-2xl p-2"> Inspiration for your first order!</h1>
        <div className="w-full overflow-hidden">
        <div className="w-full flex gap-5 overflow-x-auto shrink-0 flex-nowrap ">
          {categories.map((cate,index)=>(
            <CategoryCards key={index} data={cate}/> 
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
