const validateRoomName = (roomName) => {
  const regex = /^[a-z0-9]{6}$/
  return regex.test(roomName)
}

module.exports = validateRoomName