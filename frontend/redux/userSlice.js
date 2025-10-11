import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    city: null,
    state: null,
    shopInMyCity: null,
    itemsInMyCity: null,
    cartItems: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    setAddToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
    },
    setUpdateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity; // update only if greater than 0
        }
      }
    },
    setRemoveCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(i=>i.id!==action.payload)
    },
  },
});
export const {
  setUserData,
  setCity,
  setState,
  setShopInMyCity,
  setItemsInMyCity,
  setAddToCart,
  setUpdateQuantity,
  setRemoveCartItem
} = userSlice.actions;
export default userSlice.reducer;
