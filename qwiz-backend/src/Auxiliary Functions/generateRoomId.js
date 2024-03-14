const quickId = require('quickid')

const generateRoomId = () => {
  const roomId = quickId.generate(6)
  return roomId
}

module.exports = generateRoomId

