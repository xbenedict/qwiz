import React, { useState, useEffect } from "react";
import { usePrarams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { initializeSocket } from "../../../socketIoClient/socketIoClient";
import QuestionCardConditional from "../../Quiz/QuestionCardConditional";
import QuizFormConditional from "../../Logical/QuizFormConditional";
import QuestionsReceivedMessage from "../../Quiz/QuestionsReceivedMessage";
import CountdownTimerConditional from "../../Logical/CountdownTimerConditional";

const MainAreaContainer = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  backgroundColor: "#3C4142",
  justifyContent: "center",
  alignItems: "center",
});

const MainArea = () => {
  return (
    <MainAreaContainer>
      <QuizFormConditional />
      <QuestionsReceivedMessage />
      <QuestionCardConditional />
      <CountdownTimerConditional />
    </MainAreaContainer>
  );
};

export default MainArea;
