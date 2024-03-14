const checkAnswer = (userAnswer, storedAnswer) => {
  if (userAnswer === storedAnswer) {
    console.log("correct answer received from client", userAnswer);
    return true;
  } else {
    console.log("incorrect answer received", userAnswer);
    return false;
  }
};

module.exports = checkAnswer;
