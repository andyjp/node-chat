var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    socket.on('user connected', function(name) {
        io.emit('chat message', name + ' joined the chat.');
    });
    socket.on('user disconnected', function(name) {
        io.emit('chat message', name + ' left the chat.');
    });
    socket.on('user typing', function(name) {
        socket.broadcast.emit('user typing', name);
    });
    socket.on('stop typing', function(name) {
        socket.broadcast.emit('stop typing', name);
    });
    socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});