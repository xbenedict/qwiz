import { UseSelector, useSelector } from "react-redux";
import QuestionCard from "./QuestionCard";

const QuestionCardConditional = () => {
  const quizState = useSelector((state) => {
    return state.quizState;
  });

  if (quizState.status === "started") {
    return <QuestionCard />;
  }

  return null;
};

export default QuestionCardConditional;
