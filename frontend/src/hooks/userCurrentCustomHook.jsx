import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
function useGetCurrentUser() {
  const dispatchRedux = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8000/api/user/current",
          {
            withCredentials: true,
          }
        );
        dispatchRedux(setUserData(result.data));
        console.log(result);
      } catch (err) {
        console.log(err?.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return loading;
}
export default useGetCurrentUser;
