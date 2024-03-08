import styled from "@emotion/styled";
import { CardContent, Typography } from "@mui/material";
import PlayerList from "./PlayerList";
import styles from "../../Styles/styles";
const GlassScoreBoard = styled("Card")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(60, 65, 66, 0.1)",
  color: "#ece8ef",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 1)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderRadius: "16px",
  padding: "16px",
  margin: "50px",

  minWidth: 275,
});
const LiveScoreBoard = () => {
  return (
    <GlassScoreBoard>
      <CardContent>
        <Typography
          sx={{
            ...styles.typographyStyle,
            marginBottom: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Live Score!
        </Typography>
        <PlayerList />
      </CardContent>
    </GlassScoreBoard>
  );
};

export default LiveScoreBoard;
