'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let nickname =  (data, userId) => {
  socketPool[userId].nickname = data.target;
};

events.on('@nick', nickname);

module.exports = nickname;