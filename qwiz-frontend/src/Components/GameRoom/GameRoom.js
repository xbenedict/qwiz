import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Sidebar from "./SideBar/SideBar";
import MainArea from "./MainArea/MainArea";
import { UseDispatch } from "react-redux";
import { updatePlayers } from "../../Features/Rooms/roomsSlice";
import UserList from "./SideBar/UserList";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import QuizForm from "../Quiz/QuizForm";
import ReadyOrStartButton from "../Logical/ReadyOrStartButton";
import QuizFormConditional from "../Logical/QuizFormConditional";

const Container = styled("div")({
  display: "flex",
  height: "100vh",
});

const GameRoom = () => {
  const { roomID } = useParams();
  const gameRoomData = useSelector((state) => {
    return state.rooms;
  });

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
      <Sidebar>
        <UserList />
        <ReadyOrStartButton />
      </Sidebar>
      <MainArea>
        <QuizFormConditional />
      </MainArea>
    </Container>
  );
};

export default GameRoom;
