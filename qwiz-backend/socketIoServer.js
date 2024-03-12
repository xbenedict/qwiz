const socketIo = require("socket.io");
const connections = require("./src/Data Structures/connections");
const generateRoomId = require("./src/Auxiliary Functions/generateRoomId");
const gameRooms = require("./src/Data Structures/gameRooms");
const hideAnswers = require("./src/Auxiliary Functions/hideAnswers");
const axios = require("axios").default;
const arraysMatch = require("./src/Auxiliary Functions/arraysMatch");
const checkAnswer = require("./src/Auxiliary Functions/checkAnswer");
const scoreAnswer = require("./src/Auxiliary Functions/scoreAnswer");
const Quiz = require("./src/Data Structures/Quiz");
const rooms = require("./src/Data Structures/rooms");
const User = require("./src/Data Structures/User");
const Room = require("./src/Data Structures/Room");

const initializeSocketIoServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // remember to replace with your frontend's URL in production
      methods: ["GET", "POST"],
    },
  });
  //recheck if response is correctly placed here and change it accordingly
  let response;
  let room;
  let quiz;
  io.on("connection", (socket) => {
    let user;

    socket.on("createRoom", (username) => {
      if (!connections.has(username)) {
        //generate new roomId
        const roomId = generateRoomId();
        room = new Room(username, roomId);
        //create new user instance
        user = new User(username, socket.id, roomId);
        console.log(
          `New user ${user.username} connected, Socket ID: ${user.socketid}, Room Id: ${user.roomId}`,
        );
        //store new connection in the connections map
        connections.set(user.username, {
          socketId: user.socketId,
          roomId: user.roomId,
        });
        console.log("connections map: ", connections);

        //store new room in the rooms map

        if (!rooms.has(roomId)) {
          rooms.set(roomId, room);
          console.log("The room just created is: ", room);
          socket.join(roomId);
          io.in(roomId).emit("roomCreated", room);
        } else {
          console.log(`Room ${roomId} already exists, try creating a new room`);
        }
      } else {
        console.log(
          `username ${username} already exists, please choose a different username.`,
        );
      }
      //delete this comment once code file is checked
      // gameRooms[roomId] = {
      //   roomId,
      //   username,
      //   players: [username],
      //   readyPlayers: [],
      //   creator: username,
      //   scores: {
      //     [username]: 0,
      //   },
      // };
    });

    socket.on("joinRoom", ({ username, roomId }) => {
      if (!connections.has(username)) {
        if (rooms.has(roomId)) {
          user = new User(username, socket.id, roomId);
          room.players.push(username);
          room.username = username;
          room.scores[username] = 0;
          socket.join(roomId);
          //store new connection in the connections map
          connections.set(user.username, {
            socketId: user.socketId,
            roomId: user.roomId,
          });
          console.log("connections map: ", connections);
          console.log("the user that joined is: ", user);
          console.log("the room data is: ", room);

          //sending the room data to the client
          socket.emit("roomJoined", room);
          //emitting a playerJoined event
          io.in(roomId).emit("playerJoined", room.players);
        } else {
          console.log(`Room ${roomId} does not exist, please retry.`);
        }
      } else {
        console.log(
          `username ${username} already exists, please choose a different username.`,
        );
      }
    });

    socket.on("quizSubmitted", async (quizFormData) => {
      console.log(quizFormData);

      quiz = new Quiz(quizFormData);

      console.log("the quiz object on the server is ", quiz);

      try {
        let difficultyParam;
        if (quiz.quizFormData.difficulty === "Any Difficulty") {
          difficultyParam = "";
        } else {
          difficultyParam = `&difficulty=${quiz.quizFormData.difficulty}`;
        }
        let categoryParam;
        if (quiz.quizFormData.category === "Any Category") {
          categoryParam = "";
        } else {
          categoryParam = `&category=${quiz.quizFormData.category}`;
        }

        let typeParam;
        if (quiz.quizFormData.type === "Any Type") {
          typeParam = "";
        } else {
          typeParam = `&type=${quiz.quizFormData.type}`;
        }

        const url = `https://opentdb.com/api.php?amount=${quiz.quizFormData.numberOfQuestions}${categoryParam}${difficultyParam}${typeParam}`;
        response = await axios.get(url);
        quiz.questions = response.data.results;
        console.log("the questions are", quiz.questions);

        quiz.hiddenAnswersArray = hideAnswers(quiz.questions);

        io.in(quiz.quizFormData.roomId).emit(
          "quizQuestions",
          quiz.hiddenAnswersArray,
        );
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("playerReadyStatus", (playerReadyStatus) => {
      console.log(playerReadyStatus);
      // const room = Object.values(gameRooms).find((room) => {
      //   return room.players.includes(playerReadyStatus.username);
      // });

      if (playerReadyStatus.isPlayerReady === true) {
        room.readyPlayers.push(playerReadyStatus.username);
      }

      if (playerReadyStatus.isPlayerReady === false) {
        for (let i = room.readyPlayers.length - 1; i >= 0; i--) {
          if (room.readyPlayers[i] === playerReadyStatus.username) {
            room.readyPlayers.splice(i, 1);
          }
        }
        io.in(room.roomId).emit("countdownStopped");
      }

      if (arraysMatch(room.readyPlayers, room.players)) {
        console.log("arrays match exactly, every user is ready");

        io.in(room.roomId).emit("countdownStarted", { countdownTimer: 5000 });

        console.log("countdownStarted event emitted to client");
      }
    });

    socket.on("clientReadyForQuizStart", ({ username }) => {
      console.log("clientReadyForQuizStart event received from client");

      io.in(room.roomId).emit("quizStarted");
      room.readyPlayers.length = 0;
    });

    socket.on(
      // response.data.results[currentQuestionIndex].correct_answer
      "answerSubmitted",
      ({ answerChoice, currentQuestionIndex, username }) => {
        const storedAnswer =
          response.data.results[currentQuestionIndex].correct_answer;
        const questionType = response.data.results[currentQuestionIndex].type;
        const questionDifficulty =
          response.data.results[currentQuestionIndex].difficulty;
        console.log(answerChoice, currentQuestionIndex, username);
        const answerResult = checkAnswer(answerChoice, storedAnswer);
        room.scores[username] = scoreAnswer(
          answerResult,
          questionType,
          questionDifficulty,
          room.scores[username],
        );
        console.log("the current score is: ", room.scores[username]);
        io.in(room.roomId).emit("currentScore", room.scores);
      },
    );

    socket.on("disconnect", () => {
      try {
        const username = [...connections].find(([, value]) => {
          return value.socketId === socket.id;
        })[0];
        console.log(`User ${username} disconnected, Socket ID: ${socket.id}`);

        connections.delete(username);
        console.log(connections);

        const updatedplayersArray = room.players.filter((player) => {
          return player !== username;
        });

        //update the original gameRooms object with the updatedplayersArray

        room.players = updatedplayersArray;

        socket.to(room.roomId).emit("playerLeft", updatedplayersArray);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

module.exports = initializeSocketIoServer;
