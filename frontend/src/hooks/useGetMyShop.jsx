import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setShopData } from "../../redux/shopSlice";

const useGetMyShop = () => {
  const dispatchRedux = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/shop/get-my-shop",
          { withCredentials: true }
        );
        dispatchRedux(setShopData(res.data));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShop();
  }, []);
};

export default useGetMyShop;
