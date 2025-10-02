import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import shopReducer from "./shopSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
  },
});
export default store;
