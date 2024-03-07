import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setCurrentQuestionIndex } from "../../Features/Quiz/quizStateSlice";

const AnswerChoice = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentQuestionIndex());
  };

  return (
    <Button size="large" onClick={handleClick}>
      {props.answerChoice}
    </Button>
  );
};

export default AnswerChoice;
