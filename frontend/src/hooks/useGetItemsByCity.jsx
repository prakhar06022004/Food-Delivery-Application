import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setItemsInMyCity } from "../../redux/userSlice";
function UseGetItemsByCity() {
  const dispatchRedux = useDispatch();
  const { city } = useSelector((state) => state.user);

  useEffect(() => {
    if (!city) return;
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/item/get-by-city/${city}`,
          { withCredentials: true }
        );
        dispatchRedux(setItemsInMyCity(res.data));
        console.log(fetchItems);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchItems();
  }, [city]);
}

export default UseGetItemsByCity;
