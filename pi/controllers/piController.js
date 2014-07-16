var gpio = require("pi-gpio");

module.exports.twitter = function() {
    console.log("tw")

    var intervalId;
    var durationId;
    var on;
    var gpioPin = 16;


    gpio.open(gpioPin, "output", function(err) {
        on = 1;
        console.log('GPIO pin ' + gpioPin + ' is open. toggling LED every 100 mS for 10s');
    });

    intervalId = setInterval(function() {
        gpio.write(gpioPin, on, function() { // toggle pin between high (1) and low (0)
            on = (on + 1) % 2;
        });
    }, 100);

    durationId = setTimeout(function() {
        clearInterval(intervalId);
        clearTimeout(durationId);
        console.log('10 seconds blinking completed');
        gpio.write(gpioPin, 0, function() { // turn off pin 16
            gpio.close(gpioPin); // then Close pin 16
        });
    }, 2000); // duration in mS

};

module.exports.facebook = function() {
    console.log("fb")
    var intervalId;
    var durationId;
    var on;
    var gpioPin = 18;


    gpio.open(gpioPin, "output", function(err) {
        on = 1;
        console.log('GPIO pin ' + gpioPin + ' is open. toggling LED every 100 mS for 10s');
    });

    intervalId = setInterval(function() {
        gpio.write(gpioPin, on, function() { // toggle pin between high (1) and low (0)
            on = (on + 1) % 2;
        });
    }, 100);

    durationId = setTimeout(function() {
        clearInterval(intervalId);
        clearTimeout(durationId);
        console.log('10 seconds blinking completed');
        gpio.write(gpioPin, 0, function() { // turn off pin 16
            gpio.close(gpioPin); // then Close pin 16
        });
    }, 2000); // duration in mS

};

module.exports.dribble = function() {
    var intervalId;
    var durationId;
    var on;
    var gpioPin = 22;


    gpio.open(gpioPin, "output", function(err) {
        on = 1;
        console.log('GPIO pin ' + gpioPin + ' is open. toggling LED every 100 mS for 10s');
    });

    intervalId = setInterval(function() {
        gpio.write(gpioPin, on, function() { // toggle pin between high (1) and low (0)
            on = (on + 1) % 2;
        });
    }, 100);

    durationId = setTimeout(function() {
        clearInterval(intervalId);
        clearTimeout(durationId);
        console.log('10 seconds blinking completed');
        gpio.write(gpioPin, 0, function() { // turn off pin 16
            gpio.close(gpioPin); // then Close pin 16
        });
    }, 2000); // duration in mS

};