import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setState, setUserData } from "../../redux/userSlice";
function UseGetCity() {
  const dispatchRedux = useDispatch();
  const { userData,city,state } = useSelector((state) => state.user);
  const geoApiKey = import.meta.env.VITE_GEO_API_KEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (posi) => {
      console.log(posi);
      const latitude = posi.coords.latitude;
      const longitude = posi.coords.longitude;
      // console.log(posi.coords);
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`
      );
console.log(result)
      dispatchRedux(setCity(result?.data?.results[0]?.county));
            dispatchRedux(setState(result?.data?.results[0]?.state));
    });
  }, [userData]);
}
export default UseGetCity;
