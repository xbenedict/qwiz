import { useSelector } from "react-redux";

const Question = () => {
  const questionText = useSelector((state) => {
    return state.quizState.questions;
  });

  const currentQuestionIndex = useSelector((state) => {
    return state.quizState.currentQuestionIndex;
  });

  return (
    <div>
      <h1>{questionText[currentQuestionIndex].question}</h1>
    </div>
  );
};

export default Question;
