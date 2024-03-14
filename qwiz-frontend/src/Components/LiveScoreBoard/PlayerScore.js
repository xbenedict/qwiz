import { Typography } from "@mui/material";
import styles from "../../Styles/styles";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScores } from "../../Features/Quiz/quizStateSlice";
const PlayerScore = ({ player }) => {
  const socket = initializeSocket();

  const currentScores = useSelector((state) => {
    return state.quizState.scores;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("currentScore", (scoresObject) => {
      dispatch(setScores(scoresObject));
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Typography sx={styles.typographyStyle}>{currentScores[player]}</Typography>
  );
};
export default PlayerScore;

//working code, use it until redux state is coded
// import { Typography } from "@mui/material";
// import styles from "../../Styles/styles";
// import { initializeSocket } from "../../socketIoClient/socketIoClient";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// const PlayerScore = ({ player }) => {
//   const socket = initializeSocket();
//   const [currentScore, setCurrentScore] = useState(0);
//   const username = useSelector((state) => {
//     return state.rooms.username;
//   });
//   useEffect(() => {
//     socket.on("currentScore", (scoresObject) => {
//       setCurrentScore(scoresObject[player]);
//     });
//   }, []);
//   return <Typography sx={styles.typographyStyle}>{currentScore}</Typography>;
// };
// export default PlayerScore;
