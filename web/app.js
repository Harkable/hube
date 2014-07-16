"use strict";
var express = require('express'),
    morgan = require('morgan'),
    jade = require('jade'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

//modules
var routes = require('./routes'),
    socketsController = require("./controllers/socketsController"),
    socialController = require("./controllers/socialController");

var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.locals.env = env;
  next();
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
routes.init(app);

io.sockets.on('connection', socketsController.init );

socialController.init();

module.exports.io = io;