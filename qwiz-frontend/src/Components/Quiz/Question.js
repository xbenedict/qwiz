import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Question = () => {
  const questionText = useSelector((state) => {
    return state.quizState.questions;
  });

  const currentQuestionIndex = useSelector((state) => {
    return state.quizState.currentQuestionIndex;
  });

  return (
    <Typography
      sx={{
        color: "white",
        fontSize: "24px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {questionText[currentQuestionIndex].question}
    </Typography>
  );
};

export default Question;
