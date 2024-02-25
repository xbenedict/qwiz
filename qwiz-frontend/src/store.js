import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./Features/Rooms/roomsSlice";
import roomsAccessReducer from "./Features/Rooms/roomsAccessSlice";
import quizFormReducer from "./Features/Quiz/quizFormSlice";
import quizStateReducer from "./Features/Quiz/quizStateSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    roomsAccess: roomsAccessReducer,
    quizForm: quizFormReducer,
    quizState: quizStateReducer,
  },
});
