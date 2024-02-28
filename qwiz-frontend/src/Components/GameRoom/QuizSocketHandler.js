import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { useEffect } from "react";

const QuizSocketHandler = () => {
  useEffect(() => {
    const socket = initializeSocket();
    socket.on("quizQuestions", (questions) => {
      console.log(questions);
    });
  }, []);
};

export default QuizSocketHandler;
