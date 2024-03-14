class Room {
  constructor(username, roomId) {
    this.username = username;
    this.roomId = roomId;
    this.players = [username];
    this.readyPlayers = [];
    this.creator = username;
    this.scores = { [username]: 0 };
  }
}

module.exports = Room;
