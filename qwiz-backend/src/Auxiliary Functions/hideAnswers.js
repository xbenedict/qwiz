const hideAnswers = (questionsArray) => {
  let newArray = questionsArray.map((question) => {
    let { correct_answer, incorrect_answers, ...rest } = question;

    let answerChoices = [...incorrect_answers];
    let newItem = correct_answer;

    let randomIndex = Math.floor(Math.random() * (answerChoices.length + 1));

    answerChoices.splice(randomIndex, 0, newItem);

    return { ...rest, answerChoices };
  });

  return newArray;
};

module.exports = hideAnswers;
