const socketIo = require("socket.io");
const connections = require("./src/Data Structures/connections");
const generateRoomId = require("./src/Auxiliary Functions/generateRoomId");
const gameRooms = require("./src/Data Structures/gameRooms");
const hideAnswers = require("./src/Auxiliary Functions/hideAnswers");
const axios = require("axios").default;
const arraysMatch = require("./src/Auxiliary Functions/arraysMatch");

const initializeSocketIoServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // remember to replace with your frontend's URL in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
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
      };
      socket.join(roomId);
      io.in(roomId).emit("roomCreated", gameRooms[roomId]);
    });

    socket.on("joinRoom", ({ username, roomId }) => {
      if (gameRooms[roomId]) {
        gameRooms[roomId].players.push(username);
        gameRooms[roomId].username = username;
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
        const response = await axios.get(url);
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
      }

      console.log(gameRooms[room.roomId]);

      if (
        arraysMatch(
          gameRooms[room.roomId].readyPlayers,
          gameRooms[room.roomId].players,
        )
      ) {
        console.log("arrays match exactly, every user is ready");
      }
    });

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
