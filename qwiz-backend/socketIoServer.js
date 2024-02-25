const socketIo = require("socket.io");
const connections = require("./src/Data Structures/connections");
const generateRoomId = require("./src/Auxiliary Functions/generateRoomId");
const gameRooms = require("./src/Data Structures/gameRooms");

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
        creator: username,
      };
      socket.join(roomId);
      socket.emit("roomCreated", gameRooms[roomId]);
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

        socket.to(roomId).emit("playerJoined", gameRooms[roomId].players);
      } else {
        socket.emit("joinError", "Room not found.");
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
