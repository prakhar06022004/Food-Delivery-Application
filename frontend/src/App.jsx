import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/userCurrentCustomHook";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
const App = () => {
  const {userData} = useSelector(state=>state.user)
  useGetCurrentUser()
  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp />: <Navigate to={'/'}/>} />
      <Route path="/signin" element={!userData ? <SignIn />: <Navigate to={'/'}/>} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword/>: <Navigate to={'/'}/>} />
      <Route path="/" element={userData ? <Home/>: <Navigate to={'/signin'}/> } />
    </Routes>
  );
};

export default App;
