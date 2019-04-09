var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];



server.listen(process.env.PORT || 3000);
console.log('Server is running now...');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected Now : %s sockets connected', connections.length);

	 //// disconnect////
	socket.on('disconnect', function(data){
		
		users.splice(users.indexOf(socket), 1);
		Updateusernames();
			connections.splice(connections.indexOf(socket), 1);
			console.log('Disconnected : %s sockets connected', connections.length);

	});

	
	
	
	//// SEND MESSAGE///////
	socket.on('send message', function(data){
		
		io.sockets.emit('new message', {msg: data, user: socket.username});
	});


	//// new user/////
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		Updateusernames();
	});
	// typing status..

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);

	});



	// update username
	function Updateusernames(){
		io.sockets.emit('get users', users);
	}

});
