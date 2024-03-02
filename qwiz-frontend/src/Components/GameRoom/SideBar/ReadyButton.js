import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsPlayerReady } from "../../../Features/Quiz/quizStateSlice";
import { initializeSocket } from "../../../socketIoClient/socketIoClient";

const ReadyButton = () => {
  const isPlayerReady = useSelector((state) => state.quizState.isPlayerReady);
  const quizState = useSelector((state) => state.quizState.status);
  const username = useSelector((state) => state.rooms.username);

  const dispatch = useDispatch();
  const socket = initializeSocket();

  const playerReadyStatus = {
    username,
    isPlayerReady,
  };
  const handleClick = () => {
    dispatch(setIsPlayerReady(!isPlayerReady));
    if (quizState === "questionsReceived" && isPlayerReady === false) {
      playerReadyStatus.isPlayerReady = true;
      socket.emit("playerReadyStatus", playerReadyStatus);
    }
    if (quizState === "questionsReceived" && isPlayerReady === true) {
      playerReadyStatus.isPlayerReady = false;

      socket.emit("playerReadyStatus", playerReadyStatus);
    }
  };

  if (isPlayerReady) {
    return (
      <Button variant="contained" color="success" onClick={handleClick}>
        You are ready!
      </Button>
    );
  }

  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Not Ready
    </Button>
  );
};

export default ReadyButton;
