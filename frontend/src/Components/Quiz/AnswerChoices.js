import AnswerChoice from "./AnswerChoice";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

const AnswerChoices = () => {
  const currentQuestionIndex = useSelector((state) => {
    return state.quizState.currentQuestionIndex;
  });

  const answerChoices = useSelector((state) => {
    return state.quizState.questions[currentQuestionIndex].answerChoices;
  });

  return (
    <Box
      sx={{
        "& button": { m: 2 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {answerChoices.map((answerChoice) => {
        return (
          <AnswerChoice key={answerChoice.id} answerChoice={answerChoice} />
        );
      })}
    </Box>
  );
};

export default AnswerChoices;
