import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Question from "./Question";
import AnswerChoices from "./AnswerChoices";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const GlassCard = styled(Card)({
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  color: "#ece8ef",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 1)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderRadius: "16px",
  padding: "16px",
  margin: "50px",
  minWidth: 275,
});

const QuestionCard = () => {
  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.1,
      rotateY: 180,
      x: "-40vw",
      y: "20vh",
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };
  const currentQuestionIndex = useSelector((state) => {
    return state.quizState.currentQuestionIndex;
  });
  return (
    <motion.div
      key={currentQuestionIndex}
      initial="initial"
      animate="animate"
      variants={cardVariants}
      transition={{ duration: 0.25 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <GlassCard>
        <CardContent>
          <Question />
        </CardContent>
        <CardActions>
          <AnswerChoices />
        </CardActions>
      </GlassCard>
    </motion.div>
  );
};

export default QuestionCard;
