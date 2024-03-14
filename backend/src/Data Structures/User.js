class User {
  constructor(username, socketId, roomId) {
    this.username = username;
    this.socketId = socketId;
    this.roomId = roomId;
  }
}

module.exports = User;
