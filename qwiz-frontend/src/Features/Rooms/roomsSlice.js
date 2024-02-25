import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  username: null,
  players: [],
  creator: "",
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRoomData(state, action) {
      state.roomId = action.payload.roomId;
      state.username = action.payload.username;
      state.players = action.payload.players;
      state.creator = action.payload.creator;
    },
    updatePlayers(state, action) {
      state.players = action.payload;
    },
  },
});

export const { setRoomData, updatePlayers } = roomsSlice.actions;
export default roomsSlice.reducer;
