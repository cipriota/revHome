var serialTCPPort = 4556;
var serialTCPAddr = 'localhost';
var net = require('net');
var http = require('http');

var devices = [
	{ "id": 1, "state": false, "type": "lamp", "description": "Left head light" }, 
	{ "id": 2, "state": false, "type": "lamp", "description": "Right head light" }, 
	{ "id": 3, "state": false, "type": "outlet", "description": "Heater" },
	{ "id": 4, "state": false, "type": "lamp", "description": "device 1" }, 
	{ "id": 5, "state": false, "type": "lamp", "description": "device 2" }, 
	{ "id": 6, "state": false, "type": "lamp", "description": "device 3" },
	{ "id": 7, "state": false, "type": "lamp", "description": "device 1" }, 
	{ "id": 8, "state": false, "type": "lamp", "description": "device 2" }, 
	{ "id": 9, "state": false, "type": "lamp", "description": "device 3" },
];

var groups = [
	{ "id": 1, "devices": [1,2,3], "description": "group 1" },
	{ "id": 2, "devices": [4,5,6], "description": "group 2" },
	{ "id": 3, "devices": [7,8,9], "description": "group 3" }
];

init();
	

http.createServer(function(request,response){

	var body;

	request.on('data', function(chunk) {
		body = JSON.parse(chunk.toString());
	});


	var client = net.createConnection(
		serialTCPPort,
		serialTCPAddr, 
		function (){

			if (request.method=='POST') {
				if (body.action=='R') {
					sendData(response);
					 
				} else if (body.action=='W') {
					var state;
					
					if (body.deviceState)
						state = 1;
					else
						state = 0;
						
					var output = '$SERVER,W,' + body.deviceId + ',' + state + ',*\n\r';
					
					client.write(output);
					
					for (var i in devices) {
						if (devices[i].id==body.deviceId) {
							devices[i].state = body.deviceState;
							
							break;
						}
					}
					
					sendData(response);
					
				}

			}
			
			client.end();
			
		}
	);
		
}).listen(9090);


function init() {
	var client = net.createConnection(serialTCPPort,serialTCPAddr);
	
	client.on('connect', function() {
		var output = '';
		
		for (var i in devices) {
			output = "$SERVER,P," + devices[i].id + ",*";
			client.write(output);
		}
		client.end();
		
	});
	
	client.on('data', function(data) {
		console.log("Received: " + data.toString())
		
	});
	
	
	
}

function sendData(response) {
		
		var sendObj = [];
		
		for (var i in groups) {
			var group = {};
			var groupDevices = groups[i].devices;
			
			group.id = groups[i].id;
			group.description = groups[i].description;
			group.devices = [];
	
			for (var k in groupDevices) {
				for (var j in devices) {
					if (devices[j].id==groupDevices[k]) {
						group.devices.push(devices[j]);
				
						break;
					}
				}
				
			}
			sendObj.push(group); 
		}
		
		response.writeHeader(200, {'Content-Type': 'application/json'});

		response.write(JSON.stringify(sendObj));
		response.end();
}
