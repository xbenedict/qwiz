const scoreAnswer = (answerResult, questionType, questionDifficulty, score) => {
  if (answerResult) {
    if (questionType === "boolean") {
      if (questionDifficulty === "easy") {
        score = score += 1;
      }
      if (questionDifficulty === "medium") {
        score = score += 2;
      }
      if (questionDifficulty === "hard") {
        score = score += 3;
      }
      return score;
    } else {
      if (questionDifficulty === "easy") {
        score = score += 2;
      }
      if (questionDifficulty === "medium") {
        score = score += 4;
      }
      if (questionDifficulty === "hard") {
        score = score += 6;
      }
      return score;
    }
  } else {
    return score;
  }
};

module.exports = scoreAnswer;
