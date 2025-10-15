import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    location: {
      latitude: null,
      longitute: null,
    },
    address: null,
  },
  reducers: {
    setLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.location.latitude = latitude;
      state.location.longitute = longitude;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});
export const { setLocation, setAddress } = mapSlice.actions;
export default mapSlice.reducer;
