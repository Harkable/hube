var app = require('../app');

module.exports.init = function(socket) {

    console.log('connected');

    app.socket.on('update', function(data){
        console.log(data);
    });

};