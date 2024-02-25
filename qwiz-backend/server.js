const http = require('http');
const express = require('express');
const initializeSocketIoServer = require('./socketIoServer');

const app = express()

const server = http.createServer(app)
const io = initializeSocketIoServer(server)

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})