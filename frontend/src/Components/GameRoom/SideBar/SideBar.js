import React, { useState, useEffect } from "react";
import { usePrarams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

const Sidebar = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "250px",
  backgroundColor: "#3C4142",
  border: "2px solid #14080E",
});

export default Sidebar;
