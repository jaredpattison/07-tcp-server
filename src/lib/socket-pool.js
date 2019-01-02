'use strict';

const events = require('./events.js')
// Third Party Modules
const uuid = require('uuid/v4');

const socketPool = {};

server.on('connection', (socket) => {
  let id = uuid();
  socketPool[id] = {
    id:id,
    nickname: `User-${id}`,
    socket: socket,
  };
  socket.on('data', (buffer) => dispatchAction(id, buffer)); 
});