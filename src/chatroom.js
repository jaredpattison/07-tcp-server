'use strict';

// First Party Modules
const net = require('net');
const events = require('./lib/events.js');
const socketPool = require('./lib/socket-pool.js');
const dm = require('./actions/dm.js');



const port = process.env.PORT || 3001;
const server = net.createServer();

const commands = {};



let parse = (buffer) => {
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  return {command,payload,target,message};
};

let dispatchAction = (userId, buffer) => {
  let entry = parse(buffer);
  if ( entry && typeof commands[entry.command] === 'function' ) {
    commands[entry.command](entry, userId);
  }
};

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});
