import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import shopReducer from "./shopSlice";
import mapReducer from "./mapSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    map: mapReducer,
  },
  devTools: true,
});
export default store;