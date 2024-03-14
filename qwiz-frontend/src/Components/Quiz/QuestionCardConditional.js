import { useSelector, useDispatch } from "react-redux";
import QuestionCard from "./QuestionCard";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { setStatus } from "../../Features/Quiz/quizStateSlice";
import { setAreAllPlayersReady } from "../../Features/Quiz/quizStateSlice";

const QuestionCardConditional = () => {
  const dispatch = useDispatch();

  const quizState = useSelector((state) => {
    return state.quizState;
  });

  const socket = initializeSocket();

  socket.on("quizStarted", () => {
    console.log("quizStarted event received from server");
    dispatch(setStatus("started"));
    dispatch(setAreAllPlayersReady(false));
  });

  if (quizState.status === "started") {
    return <QuestionCard />;
  }

  return null;
};

export default QuestionCardConditional;
