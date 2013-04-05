/*
var device = [
	{"id": 1, "state": false},
	{"id": 2, "state": false},
	{"id": 3, "state": false},
	{"id": 4, "state": false},
	{"id": 5, "state": false},
	{"id": 6, "state": false},
	{"id": 7, "state": false},
	{"id": 8, "state": false},
	{"id": 9, "state": false}
];
*/
var devices = [];

var net = require('net');
var server = net.createServer(function(c) {
	console.log("server connected");
	c.on('end', function() {
		console.log("server disconnected");
	});
	c.on('data', function(rawData) {
		var data = rawData.toString().split(',');
		
		if (data[1]=='W') {
			for(var i in devices) {
				if (devices[i].id==data[2]) {
					devices[i].state=(data[3]=='1');
				}
			}
		} else if (data[1]=='P') {
			var device = {};
			
			device.id = data[2];
			device.state = false;
			
			devices.push(device);
			
			
		}
		
		console.log(rawData.toString());
		
	});
});

server.listen(4556, function() {
	console.log("server bound");
});
