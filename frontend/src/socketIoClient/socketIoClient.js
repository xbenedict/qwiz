import { io } from "socket.io-client";

let socket;

export const initializeSocket = () => {
  if (!socket) {
    const port = process.env.PORT || 5000;

    const url = `localhost:${port}`;
    socket = io(url);
    //original socket ip below, use when developing locally
    // socket = io("http://192.168.1.42:5000");
  }

  return socket;
};
