import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import CartPage from "./pages/CartPage";

import useGetCurrentUser from "./hooks/userCurrentCustomHook";
import useGetMyShop from "./hooks/useGetMyShop";
import UseGetCity from "./hooks/useGetCity";
import UseGetShopCity from "./hooks/useGetShopCity";
import UseGetItemsByCity from "./hooks/useGetItemsByCity";
import { useSelector } from "react-redux";
import CheckOutPage from "./pages/checkOutPage";

const App = () => {
  const { userData } = useSelector((state) => state.user);

  // Global hooks
  UseGetCity();
  UseGetShopCity();
  UseGetItemsByCity();

  const { loading: loadingUser } = useGetCurrentUser();
  const { loading: loadingShop } = useGetMyShop();

  // Shop loading should be considered only if userData exists
  const loading = loadingUser || (userData && loadingShop);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditShop /> : <Navigate to="/signin" />}
      />
      <Route
        path="/add-item-shop"
        element={userData ? <AddItem /> : <Navigate to="/signin" />}
      />
      <Route
        path="/edit-item-shop/:itemId"
        element={userData ? <EditItem /> : <Navigate to="/signin" />}
      />
      <Route
        path="/cart"
        element={userData ? <CartPage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/checkout"
        element={userData ? <CheckOutPage /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default App;
