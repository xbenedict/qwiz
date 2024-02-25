import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setQuizStateData } from "../../../Features/Quiz/quizStateSlice";

const ReadyButton = () => {
  const isPlayerReady = useSelector((state) => state.quizState.isPlayerReady);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setQuizStateData({ isPlayerReady: !isPlayerReady }));
  };

  if (isPlayerReady) {
    return (
      <Button variant="contained" color="success" onClick={handleClick}>
        Ready
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
