var express = require('express'),
    app     = express();

app.get('/', function (req, res){
    res.send('Hello world!!!');
});

var server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.join('chat');

    socket.on('message', function(message){
        socket.broadcast.to('chat').emit('message',{chat:message.text});
    });
});

server.listen(8002);