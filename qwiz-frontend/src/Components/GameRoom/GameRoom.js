import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import Sidebar from "./SideBar/SideBar";
import MainArea from "./MainArea/MainArea";
import { updatePlayers } from "../../Features/Rooms/roomsSlice";
import UserList from "./SideBar/UserList";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import ReadyOrStartButton from "../Logical/ReadyOrStartButton";
import QuizSocketHandler from "./QuizSocketHandler";

const Container = styled("div")({
  display: "flex",
  height: "100vh",
});

const GameRoom = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const hasAccess = useSelector((state) => {
    return state.roomsAccess.hasAccess;
  });

  useEffect(() => {
    if (!hasAccess) {
      navigate("/");
    }
    if (hasAccess) {
      const socket = initializeSocket();

      socket.on("playerJoined", (playersArray) => {
        dispatch(updatePlayers(playersArray));
      });
      socket.on("playerLeft", (updatedplayersArray) => {
        dispatch(updatePlayers(updatedplayersArray));
      });
    }
  }, [hasAccess, dispatch, navigate]);

  return (
    <Container>
      <QuizSocketHandler />
      <Sidebar>
        <UserList />
        <ReadyOrStartButton />
      </Sidebar>
      <MainArea />
    </Container>
  );
};

export default GameRoom;
