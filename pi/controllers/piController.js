var gpio = require("pi-gpio");

module.exports.twitter = function() {
    console.log("tw")
    setInterval(function() {

        gpio.close(16);
        gpio.open(16, "output", function(err) {
            gpio.write(16, 1, function() {
                gpio.close(16);
            });
        });

        gpio.close(18);
        gpio.open(18, "output", function(err) {
            gpio.write(18, 1, function() {
                gpio.close(18);
            });
        });

    }, 10000);

    gpio.close(16);
    gpio.open(16, "output", function(err) {
        gpio.write(16, 0, function() {
            gpio.close(16);
        });
    });

    gpio.close(18);
    gpio.open(18, "output", function(err) {
        gpio.write(18, 0, function() {
            gpio.close(18);
        });
    });

};

module.exports.facebook = function() {
    console.log("fb")
    setInterval(function() {

        gpio.open(23, "output", function(err) {
            gpio.write(23, 1, function() {
                gpio.close(23);
            });
        });

        gpio.open(24, "output", function(err) {
            gpio.write(24, 1, function() {
                gpio.close(24);
            });
        });

    }, 10000);

    gpio.open(23, "output", function(err) {
        gpio.write(23, 0, function() {
            gpio.close(23);
        });
    });

    gpio.open(24, "output", function(err) {
        gpio.write(24, 0, function() {
            gpio.close(24);
        });
    });

};

module.exports.dribble = function() {
    setInterval(function() {

        gpio.open(5, "output", function(err) {
            gpio.write(5, 1, function() {
                gpio.close(5);
            });
        });

        gpio.open(7, "output", function(err) {
            gpio.write(7, 1, function() {
                gpio.close(7);
            });
        });

    }, 10000);

    gpio.open(5, "output", function(err) {
        gpio.write(5, 0, function() {
            gpio.close(5);
        });
    });

    gpio.open(7, "output", function(err) {
        gpio.write(7, 0, function() {
            gpio.close(7);
        });
    });

};