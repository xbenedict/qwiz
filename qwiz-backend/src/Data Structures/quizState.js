const quizState = {
  status: "waiting", // can be 'waiting', 'questionsReceived, 'started', or 'ended'
  questions: [],
  currentQuestionIndex: 0,
  playerAnswers: {},
  scores: {},
  isPlayerReady: false,
};

module.exports = quizState;
