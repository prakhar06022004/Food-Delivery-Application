import { useSelector } from "react-redux";
import UserDashboard from "../components/userDashboard.jsx";
import OwnerDashboard from "../components/ownerDashboard.jsx";
import DeliveryBoyDashboard from "../components/deliveryBoyDashboard.jsx";
const Home = () => {
    const { userData } = useSelector((state) => state.user);

if (!userData) {
  return null; // or a loading spinner
}
  return <>
  {userData.role === "user" && <UserDashboard />}
  {userData.role === "owner" && <OwnerDashboard />}
  {userData.role === "deliveryBoy" && <DeliveryBoyDashboard />}
  </>;
};

export default Home;