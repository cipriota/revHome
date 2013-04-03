var serialTCPPort = 4556;
var serialTCPAddr = 'localhost';
var net = require('net');
var http = require('http');

var system = [
	{ 
		"id": 1, 
		"description": "Desc1", 
		"devices":[ 
			{ "id": 1, "state": false, "type": "lamp", "description": "Left head light" }, 
			{ "id": 2, "state": false, "type": "lamp", "description": "Right head light" }, 
			{ "id": 3, "state": false, "type": "outlet", "description": "Heater" }
		]}, 
	{ 
		"id": 2, 
		"description": "Desc2", 
		"devices":[ 
			{ "id": 4, "state": false, "type": "lamp", "description": "device 1" }, 
			{ "id": 5, "state": false, "type": "lamp", "description": "device 2" }, 
			{ "id": 6, "state": false, "type": "lamp", "description": "device 3" }
		]},
	{ 
		"id": 3, 
		"description": "Desc2", 
		"devices":[ 
			{ "id": 7, "state": false, "type": "lamp", "description": "device 1" }, 
			{ "id": 8, "state": false, "type": "lamp", "description": "device 2" }, 
			{ "id": 9, "state": false, "type": "lamp", "description": "device 3" }
		]}
	];


http.createServer(function(request,response){

	var body;

	request.on('data', function(chunk) {
		body = JSON.parse(chunk.toString());
	});


	var client = net.createConnection(
		serialTCPPort,
		serialTCPAddr, 
		function (){
			// R - READ
			// A - ALL
			
			if (request.method=='POST') {
				if (body.action=='R') {
					client.write("$WEB,R,A,*\n\r"); 
				} else if (body.action=='W') {
					var output = '$WEB,W,'+body.deviceId+','+body.deviceState+',*\n\r';
					client.write(output);
				}

			}
			
		}
	);
	
	client.on('data', function(rawData) {		
		var data = rawData.toString().split(',');
		var receivedDevices = [];
		
		for(var i=1; i<data.length && data[i].charAt(0)!='*'; i++) {

			var device = {};
			device.id = parseInt(data[i]);
			i++;
			device.state = (data[i] == "true");
			receivedDevices.push(device);
		}

		for (var i in system) {
			var device = system[i].devices;

			for (var j in device) {
				for (var k  in receivedDevices) {					
					if (receivedDevices[k].id==device[j].id) {
						system[i].devices[j].state=receivedDevices[k].state;
					}
				}
			}
		}
		

		response.writeHeader(200, {'Content-Type': 'application/json'});
		response.write(JSON.stringify(system));
		response.end();

		client.end();
	});

}).listen(9090);


