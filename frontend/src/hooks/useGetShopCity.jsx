import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setShopInMyCity } from "../../redux/userSlice";
import { useEffect } from "react";
function UseGetShopCity() {
  const dispatchRedux = useDispatch();
  const { city } = useSelector((state) => state.user);

  useEffect(() => {
    if (!city) return;
    const shopResultImg = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/shop/get-my-shopCity/${city}`,
          { withCredentials: true }
        );
        dispatchRedux(setShopInMyCity(res.data));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    shopResultImg();
  }, [city]);
}

export default UseGetShopCity;
