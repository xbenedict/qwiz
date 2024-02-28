import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Question from "./Question";
import AnswerChoices from "./AnswerChoices";

const QuestionCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Question />
      </CardContent>
      <CardActions>
        <AnswerChoices />
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
