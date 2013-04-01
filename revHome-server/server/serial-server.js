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

var net = require('net');
var server = net.createServer(function(c) {
	console.log("server connected");
	c.on('end', function() {
		//console.log("server disconnected");
	});
	c.on('data', function(rawData) {
		//console.log("request: " + rawData);
		var data = rawData.toString().split(',');
		var returnStr = "";
		if (data[1]=='R') {
			if (data[2]=='A') {
				returnStr += "$SERVER,";
				for(var i in device) {

					returnStr += device[i].id + "," + device[i].state + ",";
				}
				returnStr += "*\r\n";
				c.write(returnStr);
				c.pipe(c);
				//console.log("return: " + returnStr);
			}
		} else if (data[1]=='W') {
			for(var i in device) {
				if (device[i].id==data[2]) {
					device[i].state=(data[3]=='true');
				}
			}
		}
	});
});

server.listen(4556, function() {
	//console.log("server bound");
});
