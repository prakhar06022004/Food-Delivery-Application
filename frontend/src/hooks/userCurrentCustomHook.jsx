import { useEffect } from "react";
import axios from "axios";
function useGetCurrentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api/user/current', {
          withCredentials: true,
        });
        console.log(result);
      } catch (err) {
        console.log(err?.response?.data);
      } 
    };

    fetchUser();
  }, []);
}
export default useGetCurrentUser;
