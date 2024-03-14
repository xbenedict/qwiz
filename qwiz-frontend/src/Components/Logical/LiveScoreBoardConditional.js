import { useSelector } from "react-redux";

import LiveScoreBoard from "../LiveScoreBoard/LiveScoreBoard";

const LiveScoreBoardConditional = () => {
  const quizState = useSelector((state) => {
    return state.quizState;
  });

  if (quizState.status === "started") {
    return <LiveScoreBoard />;
  }

  return null;
};

export default LiveScoreBoardConditional;
