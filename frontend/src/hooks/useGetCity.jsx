import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCity, setUserData } from "../../redux/userSlice";
function UseGetCity() {
  const dispatchRedux = useDispatch();
  const geoApiKey = import.meta.env.VITE_GEO_API_KEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (posi) => {
      console.log(posi);
      const latitude = posi.coords.latitude;
      const longitude = posi.coords.longitude;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`
      );
      dispatchRedux(setCity(result?.data?.results[0]?.county));

      // console.log(result);
    });
  }, []);
}
export default UseGetCity;
