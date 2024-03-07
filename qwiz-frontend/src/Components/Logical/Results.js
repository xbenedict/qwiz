import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import { setStatus } from "../../Features/Quiz/quizStateSlice";
import { setIsPlayerReady } from "../../Features/Quiz/quizStateSlice";
const Results = () => {
  const quizState = useSelector((state) => {
    return state.quizState.status;
  });
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setStatus("waiting"));
    dispatch(setIsPlayerReady(false));
  };
  if (quizState === "ended") {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{
              color: "Black",
              fontSize: "24px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            The quiz ended
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" onClick={handleClick}>
            Start a new quiz!
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default Results;
