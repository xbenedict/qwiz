import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const QuestionsReceivedMessage = () => {
  const quizStatus = useSelector((state) => state.quizState.status);
  const creator = useSelector((state) => state.rooms);
  const areAllPlayersReady = useSelector(
    (state) => state.quizState.areAllPlayersReady,
  );

  if (quizStatus === "questionsReceived" && !areAllPlayersReady) {
    let message;
    if (creator.creator === creator.username) {
      message =
        "Quiz questions ready, click on Start Battle! When all players are ready the quiz battle will start!";
    } else {
      message =
        "Quiz questions ready, click on Ready! When all players are ready the quiz battle will start!";
    }

    return (
      <Box>
        <Typography
          sx={{
            color: "white",
            fontSize: "24px",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default QuestionsReceivedMessage;
