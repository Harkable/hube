// Require
var config = require('./config'),
    io = require('socket.io-client');
socket = io.connect(config.host + ':' + config.port);

var socketController = require('./controllers/socketController');

socket.on('connect', socketController.init);

module.exports.socket = socket;