var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8877);

io.on('connection', function (socket) {
    console.log('connection');
});

console.log('server listen...');