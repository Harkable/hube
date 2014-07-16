var app = require('../app'),
    piController = require('./piController');

module.exports.init = function(socket) {

    console.log('connected');

    app.socket.on('update', function(data) {

        console.log(data);

        switch (data.type) {
            case 'fb':
                piController.facebook();
                break;
            case 'drib':
                piController.dribble();
                break;
            case 'tweet':
                piController.twitter();
                break;
        }

    });

};