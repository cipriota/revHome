revHome
=======

Dev info:
	Enable localhost AJAX requests in chrome
		google-chrome  --disable-web-security


Setup:

Raspberry pi:
  connected to the main dhcp server via ethernet/wifi


Device config
  - Id
  - Previous device Id
  - Next device Id
  - Group Id
  - Type (Switcher/Router)

Available remote commands sent by the server
  - Write commands
    - Turn on
    - Turn off
  - Read commands
    - On/Off status
    - Sensor data


Events
-
  - Device registration. Device turns on and sends registration command to server in order to receive new commands
  - Device status change
  - Read data
  
Network
-
  Point to point. Master based commands via SPI wireless network to client devices
  
Communication
-

  
###Server-Device

This system will have it's devices communicating through NMEA-like csv strings.

$MASTER,command,device,value,*

	Command:
		P - Initialize device
		W - Write command
		R - Read value (not yet implemented)
	Device:
		Device id (1,2,...,n)
	Value:
		[0,1,...,255] ( >0 means on state)
		
example

	Turn on device 3: 
		$MASTER,W,3,1,*
	Turn off device 3:
		$MASTER,W,3,0,*

###WEB Client - Server
WEB Client to server commnunication will be implemented using ajax requests through sockets (GET-POST) running on server.

	{ 'action': command, 'device': deviceId, 'value': deviceId's value }
	
example

	Turn on device 3:
		{ 'action': 'W', 'device': 3, 'value': 1 }

