import { createSlice } from "@reduxjs/toolkit";

const quizFormSlice = createSlice({
  name: "quizForm",
  initialState: {
    numberOfQuestions: "",
    category: "",
    difficulty: "",
    type: "",
    encoding: "Default Encoding",
  },
  reducers: {
    setQuizFormData(state, action) {
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.category = action.payload.category;
      state.difficulty = action.payload.difficulty;
      state.type = action.payload.type;
    },
  },
});

export const { setQuizFormData } = quizFormSlice.actions;
export default quizFormSlice.reducer;
