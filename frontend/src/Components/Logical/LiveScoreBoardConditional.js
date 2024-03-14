import { useSelector, useDispatch } from "react-redux";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { setStatus } from "../../Features/Quiz/quizStateSlice";
import { setAreAllPlayersReady } from "../../Features/Quiz/quizStateSlice";
import LiveScoreBoard from "../LiveScoreBoard/LiveScoreBoard";

const LiveScoreBoardConditional = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => {
    return state.quizState;
  });

  if (quizState.status === "started") {
    return <LiveScoreBoard />;
  }

  return null;
};

export default LiveScoreBoardConditional;
