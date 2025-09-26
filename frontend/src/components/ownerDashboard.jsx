import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const OwnerDashboard = () => {
  const { shopData } = useSelector((state) => state.shop);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar />
      {!shopData && (
        <div className="flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"></div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
