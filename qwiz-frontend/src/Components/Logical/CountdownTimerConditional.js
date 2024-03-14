import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAreAllPlayersReady } from "../../Features/Quiz/quizStateSlice";
import { initializeSocket } from "../../socketIoClient/socketIoClient";

const CountdownTimerConditional = () => {
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const quizStatus = useSelector((state) => state.quizState.status);
  const areAllPlayersReady = useSelector(
    (state) => state.quizState.areAllPlayersReady,
  );

  const username = useSelector((state) => state.rooms.username);

  const socket = initializeSocket();

  useEffect(() => {
    socket.on("countdownStarted", handleCountdownStarted);
    socket.on("countdownStopped", handleCountdownStopped);

    return () => {
      socket.off("countdownStarted");
      socket.off("countdownStopped");
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let interval = null;

    if (areAllPlayersReady && quizStatus === "questionsReceived") {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            if (prevTimer === 1 && areAllPlayersReady) {
              socket.emit("clientReadyForQuizStart", { username });
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line
  }, [areAllPlayersReady, quizStatus]);

  const handleCountdownStarted = ({ countdownTimer }) => {
    console.log("countdownStarted event received from server");
    setTimer(countdownTimer / 1000);
    dispatch(setAreAllPlayersReady(true));
  };

  const handleCountdownStopped = () => {
    dispatch(setAreAllPlayersReady(false));
  };

  if (
    areAllPlayersReady &&
    quizStatus === "questionsReceived" &&
    timer !== null
  ) {
    return (
      <Box>
        <Typography sx={{ color: "white", fontSize: "2em" }}>
          {`The quiz battle will start in ${timer} seconds!`}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default CountdownTimerConditional;
