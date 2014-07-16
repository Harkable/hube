var app = require('../app'),
    piContrller = require('./piController');

module.exports.init = function(socket) {

    console.log('connected');

    app.socket.on('update', function(data) {

        console.log(data);

        switch (data.type) {

            case 'fb':
                piContrller.facebook();
                break;
            case 'drib':
                piContrller.dribble();
                break;
            case 'tweet':
                piContrller.twitter();
                break;
        }

    });

};