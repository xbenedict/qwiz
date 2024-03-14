import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuestions, setStatus } from "../../Features/Quiz/quizStateSlice";

const QuizSocketHandler = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = initializeSocket();
    socket.on("quizQuestions", (questions) => {
      console.log(questions);
      dispatch(setQuestions(questions));
      dispatch(setStatus("questionsReceived"));
    });
    // eslint-disable-next-line
  }, []);
};

export default QuizSocketHandler;
