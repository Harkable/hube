// Require
var gpio = require("pi-gpio");

// Include config
var config = require('./config');

gpio.open(16, "output", function(err) { // Open pin 16 for output
    gpio.write(16, 1, function() { // Set pin 16 high (1)
        gpio.close(16); // Close pin 16
    });
});