import { createSlice } from "@reduxjs/toolkit";

const quizStateSlice = createSlice({
  name: "quizState",
  initialState: {
    status: "waiting", // can be 'waiting', 'questionsReceived, 'started', or 'ended'
    questions: [], // array of questions
    currentQuestionIndex: 0, // index of the current question in the questions array
    playerAnswers: {}, // object containing the answers to the questions that the user answered
    scores: {}, // object containing the player score for the quiz
    isPlayerReady: false,
  },
  reducers: {
    setQuizStateData(state, action) {
      if (action.payload.currentQuestionIndex !== undefined) {
        state.currentQuestionIndex = action.payload.currentQuestionIndex;
      }
      if (action.payload.playerAnswers) {
        state.playerAnswers = action.payload.playerAnswers;
      }
      if (action.payload.scores) {
        state.scores = action.payload.scores;
      }
      state.isPlayerReady = action.payload.isPlayerReady;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});

export const { setQuizStateData, setStatus, setQuestions } =
  quizStateSlice.actions;
export default quizStateSlice.reducer;
