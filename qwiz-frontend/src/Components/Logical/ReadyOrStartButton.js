import { useSelector } from "react-redux";
import StartBattleButton from "../GameRoom/SideBar/StartBattleButton";
import ReadyButton from "../GameRoom/SideBar/ReadyButton";

const ReadyOrStartButton = () => {
  const quizStatus = useSelector((state) => state.quizState.status);
  const creator = useSelector((state) => state.rooms);

  if (quizStatus === "waiting") {
    if (creator.creator === creator.username) {
      return <StartBattleButton />;
    } else {
      return <ReadyButton />;
    }
  }

  return null;
};

export default ReadyOrStartButton;
