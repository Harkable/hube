var gpio = require("pi-gpio");

module.exports.twitter = function() {
    console.log("tw")

    var intervalId;
    var durationId;
    var on;
    var twPin1 = 16;
    var twPin2 = 18;


    gpio.open(twPin1, "output", function(err) {
        on = 1;
        console.log('GPIO pin ' + twPin1 + ' is open. toggling LED every 100 mS for 10s');
    });

    gpio.open(twPin2, "output", function(err) {
        on = 1;
        console.log('GPIO pin ' + twPin2 + ' is open. toggling LED every 100 mS for 10s');
    });

    intervalId = setInterval(function() {
        gpio.write(twPin1, on, function() { // toggle pin between high (1) and low (0) 
            on = (on + 1) % 2;
        });
        gpio.write(twPin2, on, function() { // toggle pin between high (1) and low (0) 
            on = (on + 1) % 2;
        });
    }, 100);

    durationId = setTimeout(function() {
        clearInterval(intervalId);
        clearTimeout(durationId);
        console.log('10 seconds blinking completed');
        gpio.write(twPin1, 0, function() { // turn off pin 16 
            gpio.close(twPin1); // then Close pin 16 
            process.exit(0); // and terminate the program 
        });
        gpio.write(twPin2, 0, function() { // turn off pin 16 
            gpio.close(twPin2); // then Close pin 16 
            process.exit(0); // and terminate the program 
        });
    }, 2000); // duration in mS

};

// module.exports.facebook = function() {
//     console.log("fb")
//     setInterval(function() {

//         gpio.open(23, "output", function(err) {
//             gpio.write(23, 1, function() {
//                 gpio.close(23);
//             });
//         });

//         gpio.open(24, "output", function(err) {
//             gpio.write(24, 1, function() {
//                 gpio.close(24);
//             });
//         });

//     }, 10000);

//     gpio.open(23, "output", function(err) {
//         gpio.write(23, 0, function() {
//             gpio.close(23);
//         });
//     });

//     gpio.open(24, "output", function(err) {
//         gpio.write(24, 0, function() {
//             gpio.close(24);
//         });
//     });

// };

// module.exports.dribble = function() {
//     setInterval(function() {

//         gpio.open(5, "output", function(err) {
//             gpio.write(5, 1, function() {
//                 gpio.close(5);
//             });
//         });

//         gpio.open(7, "output", function(err) {
//             gpio.write(7, 1, function() {
//                 gpio.close(7);
//             });
//         });

//     }, 10000);

//     gpio.open(5, "output", function(err) {
//         gpio.write(5, 0, function() {
//             gpio.close(5);
//         });
//     });

//     gpio.open(7, "output", function(err) {
//         gpio.write(7, 0, function() {
//             gpio.close(7);
//         });
//     });

// };