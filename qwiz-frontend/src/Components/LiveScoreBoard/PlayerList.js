import { Box, Typography } from "@mui/material";
import PlayerScoreCard from "./PlayerScoreCard";
import { useSelector } from "react-redux";
import styles from "../../Styles/styles";
import PlayerScore from "./PlayerScore";

const PlayerList = () => {
  const players = useSelector((state) => {
    return state.rooms.players;
  });

  return (
    <Box>
      {players.map((player) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={styles.typographyStyle}>{player}</Typography>
            <PlayerScore />
          </Box>
        );
      })}
    </Box>
  );
};
export default PlayerList;
