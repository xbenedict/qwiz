import { createSlice } from "@reduxjs/toolkit";

const roomsAccessSlice = createSlice({
  name: "roomsAccess",
  initialState: { hasAccess: false },
  reducers: {
    grantAccess(state) {
      state.hasAccess = true;
    },
    denyAccess(state) {
      state.hasAccess = false;
    },
  },
});

export const { grantAccess, denyAccess } = roomsAccessSlice.actions;
export default roomsAccessSlice.reducer;
