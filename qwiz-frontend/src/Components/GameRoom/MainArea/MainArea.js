import React, { useState, useEffect } from "react";
import { usePrarams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { initializeSocket } from "../../../socketIoClient/socketIoClient";
import QuestionCardConditional from "../../Quiz/QuestionCardConditional";
import QuizFormConditional from "../../Logical/QuizFormConditional";
import QuestionsReceivedMessage from "../../Quiz/QuestionsReceivedMessage";
import CountdownTimerConditional from "../../Logical/CountdownTimerConditional";
import Results from "../../Logical/Results";
import LiveScoreBoardConditional from "../../Logical/LiveScoreBoardConditional";
const MainAreaContainer = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  backgroundColor: "#3c4142",
  justifyContent: "center",
  alignItems: "center",
});

const MainArea = () => {
  return (
    <MainAreaContainer>
      <QuizFormConditional />
      <QuestionsReceivedMessage />
      <CountdownTimerConditional />
      <LiveScoreBoardConditional />
      <QuestionCardConditional />
      <Results />
    </MainAreaContainer>
  );
};

export default MainArea;
