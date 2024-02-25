import { useSelector } from "react-redux";
import QuizForm from "../Quiz/QuizForm";

const QuizFormConditional = () => {
  const quizStatus = useSelector((state) => state.quizState.status);
  const creator = useSelector((state) => state.rooms);

  if (quizStatus === "waiting") {
    if (creator.creator === creator.username) {
      return <QuizForm />;
    }
  }

  return null;
};

export default QuizFormConditional;
