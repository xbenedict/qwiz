import { Typography } from "@mui/material";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { useDispatch } from "react-redux";
import { setStatus } from "../../Features/Quiz/quizStateSlice";
import { useSelector } from "react-redux";

const CountdownTimerConditional = () => {
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const quizStatus = useSelector((state) => state.quizState.status);

  useEffect(() => {
    const socket = initializeSocket();
    let interval;
    socket.on("countdownStarted", ({ countdownTimer }) => {
      dispatch(setStatus("loading"));
      console.log("countdownStarted event received, quizStatus =", quizStatus);

      setTimer(countdownTimer / 1000);
      interval = setInterval(() => {
        setTimer((prevState) => {
          return prevState - 1;
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, countdownTimer);
    });
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      socket.off("countdownStarted");
    };
  }, []);

  if (quizStatus === "loading") {
    return (
      <Box>
        <Typography
          sx={{ color: "white", fontSize: "2em" }}
        >{`The quiz battle will start in ${timer} seconds!`}</Typography>
      </Box>
    );
  }

  return null;
};

export default CountdownTimerConditional;
