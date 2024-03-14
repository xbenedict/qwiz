import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../../Styles/styles";
import PlayerScore from "./PlayerScore";
import { useEffect, useState } from "react";

const PlayerList = () => {
  const players = useSelector((state) => {
    return state.rooms.players;
  });

  const currentScores = useSelector((state) => {
    return state.quizState.scores;
  });

  const [sortedArray, setSortedArray] = useState([]);

  const sortArray = (players, currentScores) => {
    const sorted = [...players].sort((a, b) => {
      return currentScores[b] - currentScores[a];
    });

    setSortedArray(sorted);
  };

  useEffect(() => {
    sortArray(players, currentScores);
  }, [currentScores, players]);

  //players was added to the dependency array, based on an eslint warning, remove if functionality breaks

  return (
    <Box>
      {sortedArray.map((player) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={styles.typographyStyle}>{player}</Typography>
            <PlayerScore player={player} />
          </Box>
        );
      })}
    </Box>
  );
};
export default PlayerList;
