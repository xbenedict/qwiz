import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { io } from "socket.io-client";
import validateRoomName from "../../Validators/validateRoomName";
import { setRoomData } from "../../Features/Rooms/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { grantAccess } from "../../Features/Rooms/roomsAccessSlice";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#3c4142",
  height: "100vh",
  overflow: "hidden",
  // width: "100vw",
});

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(0);
  const [roomId, setroomId] = useState("");

  const dispatch = useDispatch();
  const roomData = useSelector((state) => {
    return state.rooms;
  });

  const navigate = useNavigate();

  const handleUsernameSubmit = () => {
    if (username.length >= 4 && username.length <= 12) {
      setStep(1);
    } else {
      alert("Username must be between 4 and 12 characters");
    }
  };

  const handleCreateRoom = () => {
    const socket = initializeSocket();

    socket.emit("createRoom", username);
    socket.on("roomCreated", (gameRoomData) => {
      console.log("Room created successfully: ", gameRoomData);
      dispatch(setRoomData(gameRoomData));
      dispatch(grantAccess());
      navigate(`/room/${gameRoomData.roomId}`);
    });
  };

  const handleJoinRoom = () => {
    if (validateRoomName(roomId)) {
      const data = {
        username: username,
        roomId: roomId,
      };

      const socket = initializeSocket();

      socket.emit("joinRoom", data);

      socket.on("roomJoined", (gameRoomData) => {
        console.log("Room joined:", gameRoomData);
        dispatch(setRoomData(gameRoomData));
        dispatch(grantAccess());

        navigate(`/room/${gameRoomData.roomId}`);
      });

      socket.on("joinError", (error) => {
        console.log(error);
      });
    } else {
      alert("Invalid Room Id, please try again.");
    }
  };

  return (
    <Container>
      <div>
        {step === 0 ? (
          <div>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={handleUsernameSubmit}>Submit</Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => handleCreateRoom()}>Create Room</Button>
            <Button onClick={() => handleJoinRoom()}>Join Room</Button>
            <TextField
              label="Room Id"
              value={roomId}
              onChange={(e) => setroomId(e.target.value)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default LandingPage;
