import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestionIndex } from "../../Features/Quiz/quizStateSlice";
import { initializeSocket } from "../../socketIoClient/socketIoClient";

const AnswerChoice = (props) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.rooms.username;
  });
  const roomId = useSelector((state) => {
    return state.rooms.roomId;
  });
  const currentQuestionIndex = useSelector((state) => {
    return state.quizState.currentQuestionIndex;
  });
  const socket = initializeSocket();
  const handleClick = () => {
    dispatch(setCurrentQuestionIndex());

    socket.emit("answerSubmitted", {
      answerChoice: props.answerChoice,
      currentQuestionIndex,
      username,
      roomId,
    });
  };

  return (
    <Button
      size="large"
      onClick={handleClick}
      sx={{
        color: "#ece8ef",
        fontSize: "24px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {props.answerChoice}
    </Button>
  );
};

export default AnswerChoice;
