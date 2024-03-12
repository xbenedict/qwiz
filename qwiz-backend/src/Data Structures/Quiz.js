class Quiz {
  static count;

  constructor(quizFormData) {
    this.status = "waiting";
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.playerAnswers = {};
    this.scores = {};
    this.hiddenAnswersArray = [];
    this.quizFormData = quizFormData || {
      numberOfQuestions: null,
      category: null,
      difficulty: "",
      type: "",
      encoding: "Default Encoding",
      roomId: "",
    };
    Quiz.count++;
  }
}

module.exports = Quiz;
