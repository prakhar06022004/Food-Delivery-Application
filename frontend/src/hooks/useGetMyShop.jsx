import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setShopData } from "../../redux/shopSlice";

const useGetMyShop = () => {
  const dispatchRedux = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    } // userData ke bina fetch mat karo

    const fetchShop = async () => {
      // setLoading(true); // fetch start hone pe loading true
      try {
        const res = await axios.get(
          "http://localhost:8000/api/shop/get-my-shop",
          { withCredentials: true }
        );
        dispatchRedux(setShopData(res.data));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // fetch complete hone pe loading false
      }
    };

    fetchShop();
  }, [userData, dispatchRedux]); // ✅ sirf userData aur dispatchRedux

  return loading; // ✅ hook return kare loading
};

export default useGetMyShop;
