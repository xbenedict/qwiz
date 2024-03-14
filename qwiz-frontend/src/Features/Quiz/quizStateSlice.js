import { createSlice } from "@reduxjs/toolkit";

const quizStateSlice = createSlice({
  name: "quizState",
  initialState: {
    status: "waiting", // can be 'waiting', 'questionsReceived, 'loading', 'started', or 'ended'
    questions: [], // array of questions
    currentQuestionIndex: 0, // index of the current question in the questions array
    playerAnswers: {}, // object containing the answers to the questions that the user answered
    scores: {}, // object containing the players scores for the quiz
    isPlayerReady: false,
    areAllPlayersReady: false,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setIsPlayerReady(state, action) {
      state.isPlayerReady = action.payload;
    },
    setAreAllPlayersReady(state, action) {
      state.areAllPlayersReady = action.payload;
    },
    setCurrentQuestionIndex(state, action) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.status = "ended";
        state.currentQuestionIndex = 0;
      }
    },
    setScores(state, action) {
      state.scores = action.payload;
    },
  },
});

export const {
  setStatus,
  setQuestions,
  setIsPlayerReady,
  setAreAllPlayersReady,
  setCurrentQuestionIndex,
  setScores,
} = quizStateSlice.actions;
export default quizStateSlice.reducer;
