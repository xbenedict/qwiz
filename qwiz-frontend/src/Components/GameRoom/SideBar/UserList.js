import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled("div")({
  display: "flex",
  flex: 1,
});

const UserList = () => {
  const players = useSelector((state) => state.rooms.players);

  return (
    <Container>
      <List
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "flex-start",
          flexDirection: "column",
          color: "#ece8ef",
        }}
      >
        {players.map((username) => (
          <ListItem key={username}>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontSize: "24px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {username}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
