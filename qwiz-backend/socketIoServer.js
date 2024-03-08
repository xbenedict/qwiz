const socketIo = require("socket.io");
const connections = require("./src/Data Structures/connections");
const generateRoomId = require("./src/Auxiliary Functions/generateRoomId");
const gameRooms = require("./src/Data Structures/gameRooms");
const hideAnswers = require("./src/Auxiliary Functions/hideAnswers");
const axios = require("axios").default;
const arraysMatch = require("./src/Auxiliary Functions/arraysMatch");
const checkAnswer = require("./src/Auxiliary Functions/checkAnswer");
const scoreAnswer = require("./src/Auxiliary Functions/scoreAnswer");

const initializeSocketIoServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // remember to replace with your frontend's URL in production
      methods: ["GET", "POST"],
    },
  });

  let timerId;
  let response;
  io.on("connection", (socket) => {
    let score = 0;
    socket.on("createRoom", (username) => {
      console.log(`New user ${username} connected, Socket ID: ${socket.id}`);

      //store new connection in the connections map
      connections.set(username, socket.id);
      console.log(connections);

      const roomId = generateRoomId();
      //delete the console.log(roomID) line
      console.log(roomId);
      gameRooms[roomId] = {
        roomId,
        username,
        players: [username],
        readyPlayers: [],
        creator: username,
        scores: {
          [username]: 0,
        },
      };
      socket.join(roomId);
      io.in(roomId).emit("roomCreated", gameRooms[roomId]);
    });

    socket.on("joinRoom", ({ username, roomId }) => {
      if (gameRooms[roomId]) {
        gameRooms[roomId].players.push(username);
        gameRooms[roomId].username = username;
        gameRooms[roomId].scores[username] = 0;
        socket.join(roomId);

        //store new connection in the connections map
        connections.set(username, socket.id);
        console.log(connections);

        //sending the room data to the client
        socket.emit("roomJoined", gameRooms[roomId]);

        io.in(roomId).emit("playerJoined", gameRooms[roomId].players);
      }
    });

    socket.on("quizSubmitted", async (quizFormData) => {
      console.log(quizFormData);

      try {
        let difficultyParam;
        if (quizFormData.difficulty === "Any Difficulty") {
          difficultyParam = "";
        } else {
          difficultyParam = `&difficulty=${quizFormData.difficulty}`;
        }
        let categoryParam;
        if (quizFormData.category === "Any Category") {
          categoryParam = "";
        } else {
          categoryParam = `&category=${quizFormData.category}`;
        }

        let typeParam;
        if (quizFormData.type === "Any Type") {
          typeParam = "";
        } else {
          typeParam = `&type=${quizFormData.type}`;
        }

        const url = `https://opentdb.com/api.php?amount=${quizFormData.numberOfQuestions}${categoryParam}${difficultyParam}${typeParam}`;
        response = await axios.get(url);
        console.log("the questions are", response.data.results);

        let hiddenAnswersArray = hideAnswers(response.data.results);

        io.in(quizFormData.roomId).emit("quizQuestions", hiddenAnswersArray);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("playerReadyStatus", (playerReadyStatus) => {
      console.log(playerReadyStatus);
      const room = Object.values(gameRooms).find((room) => {
        return room.players.includes(playerReadyStatus.username);
      });

      if (playerReadyStatus.isPlayerReady === true) {
        gameRooms[room.roomId].readyPlayers.push(playerReadyStatus.username);
      }

      if (playerReadyStatus.isPlayerReady === false) {
        for (
          let i = gameRooms[room.roomId].readyPlayers.length - 1;
          i >= 0;
          i--
        ) {
          if (
            gameRooms[room.roomId].readyPlayers[i] ===
            playerReadyStatus.username
          ) {
            gameRooms[room.roomId].readyPlayers.splice(i, 1);
          }
        }
        io.in(room.roomId).emit("countdownStopped");
      }

      console.log(gameRooms[room.roomId]);

      if (
        arraysMatch(
          gameRooms[room.roomId].readyPlayers,
          gameRooms[room.roomId].players,
        )
      ) {
        console.log("arrays match exactly, every user is ready");

        io.in(room.roomId).emit("countdownStarted", { countdownTimer: 5000 });

        console.log("countdownStarted event emitted to client");
      }
    });

    socket.on("clientReadyForQuizStart", ({ username }) => {
      console.log("clientReadyForQuizStart event received from client");
      const room = Object.values(gameRooms).find((room) => {
        return room.players.includes(username);
      });
      io.in(room.roomId).emit("quizStarted");
      gameRooms[room.roomId].readyPlayers.length = 0;
    });

    socket.on(
      // response.data.results[currentQuestionIndex].correct_answer
      "answerSubmitted",
      ({ answerChoice, currentQuestionIndex, username, roomId }) => {
        const storedAnswer =
          response.data.results[currentQuestionIndex].correct_answer;
        const questionType = response.data.results[currentQuestionIndex].type;
        const questionDifficulty =
          response.data.results[currentQuestionIndex].difficulty;
        console.log(answerChoice, currentQuestionIndex, username, roomId);
        const answerResult = checkAnswer(answerChoice, storedAnswer);
        score = scoreAnswer(
          answerResult,
          questionType,
          questionDifficulty,
          score,
        );
        gameRooms[roomId].scores[username] = score;
        io.in(roomId).emit("currentScore", gameRooms[roomId].scores);
      },
    );

    socket.on("disconnect", () => {
      const username = [...connections].find(([, socketId]) => {
        return socketId === socket.id;
      })[0];
      console.log(`User ${username} disconnected, Socket ID: ${socket.id}`);

      connections.delete(username);
      console.log(connections);

      const room = Object.values(gameRooms).find((room) => {
        return room.players.includes(username);
      });

      const updatedplayersArray = room.players.filter((player) => {
        return player !== username;
      });

      //update the original gameRooms object with the updatedplayersArray

      gameRooms[room.roomId].players = updatedplayersArray;

      socket.to(room.roomId).emit("playerLeft", updatedplayersArray);
    });
  });
};

module.exports = initializeSocketIoServer;
