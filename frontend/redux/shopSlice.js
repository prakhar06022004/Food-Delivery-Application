import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shopData: null,
  },
  reducers: {
    setShopData: (state, action) => {
      state.shopData = action.payload;
    },
  },
});

export const { setShopData } = shopSlice.actions;
export default shopSlice.reducer;
