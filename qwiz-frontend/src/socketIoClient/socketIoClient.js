import { io } from "socket.io-client";

let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("http://backend.qwiz.app");
    //original socket ip below, use when developing locally
    // socket = io("http://192.168.1.42:5000");
    //socket = io("http://backend.qwiz.app:6690");
  }

  return socket;
};
