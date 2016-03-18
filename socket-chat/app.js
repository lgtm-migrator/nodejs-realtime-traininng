var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	 console.log(' ==>>> Connected ');

	socket.on('disconnect', function () {
		console.log('disconnected');
	});

	socket.on('chat_message', function (msg) {
		console.log('Chat message = ', msg);

		io.emit('chat_message', msg);
	});

	socket.on('set_user', function (username) {
		socket.username = username;
	});
});

io.emit('chat_message', { for: 'everyone' });

http.listen(3000, function() {
  console.log('Listen on 0.0.0.0:3000');
});
