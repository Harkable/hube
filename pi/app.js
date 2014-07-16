// Require
var config = require('./config'),
    gpio = require("pi-gpio"),
    io = require('socket.io-client');
    socket = io.connect( config.host + ':3000');

var socketController = require('./controllers/socketController');

gpio.open(16, "output", function(err) { // Open pin 16 for output
    gpio.write(16, 1, function() { // Set pin 16 high (1)
        gpio.close(16); // Close pin 16
    });
});

socket.on('connect', socketController.init );

module.exports.socket = socket;