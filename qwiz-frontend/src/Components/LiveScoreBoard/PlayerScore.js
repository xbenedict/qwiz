import { Typography } from "@mui/material";
import styles from "../../Styles/styles";
import { initializeSocket } from "../../socketIoClient/socketIoClient";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const PlayerScore = ({ player }) => {
  const socket = initializeSocket();
  const [currentScore, setCurrentScore] = useState(0);
  const username = useSelector((state) => {
    return state.rooms.username;
  });
  useEffect(() => {
    socket.on("currentScore", (scoresObject) => {
      // console.log("the current score is: ", score);
      setCurrentScore(scoresObject[player]);
    });
  }, []);
  return <Typography sx={styles.typographyStyle}>{currentScore}</Typography>;
};
export default PlayerScore;

//original working code, use it if above doesn't work
// import { Typography } from "@mui/material";
// import styles from "../../Styles/styles";
// import { initializeSocket } from "../../socketIoClient/socketIoClient";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// const PlayerScore = ({ player }) => {
//   const socket = initializeSocket();
//   const [currentScore, setCurrentScore] = useState(0);
//   const [otherPlayerScore, setOtherPlayerScore] = useState(0);
//   const username = useSelector((state) => {
//     return state.rooms.username;
//   });
//   useEffect(() => {
//     socket.on("currentScore", (scoresObject) => {
//       // console.log("the current score is: ", score);
//       setCurrentScore(scoresObject[username]);
//       setOtherPlayerScore(scoresObject[player]);
//     });
//   }, []);
//   if (player === username) {
//     return <Typography sx={styles.typographyStyle}>{currentScore}</Typography>;
//   } else {
//     return (
//       <Typography sx={styles.typographyStyle}>{otherPlayerScore}</Typography>
//     );
//   }
// };
// export default PlayerScore;
