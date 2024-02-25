import React, { useState, useEffect } from "react";
import { usePrarams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

const MainArea = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  backgroundColor: "#3C4142",
  justifyContent: "center",
  alignItems: "center",
});

export default MainArea;
