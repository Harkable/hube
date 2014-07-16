"use strict";
var app = require('../app');

module.exports.init = function(socket){

};
module.exports.update = function(type){

    app.io.sockets.emit('update',
        { type: type }
    );
};