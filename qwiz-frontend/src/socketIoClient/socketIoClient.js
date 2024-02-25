import { io } from 'socket.io-client'

let socket

export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://192.168.1.42:5000')
  }

  return socket
}