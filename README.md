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
  This system will have it's devices communicating by csv strings.
  
  
  Server<->Device link protocol:
  	Server->Server Device (read command)
  		Req: $SER,R,*
  		Ack: $DEVC,A,<value>,*
  	
  	Server->Server Device (set command)
  		Req: $SERV,W,<value>,*
  		Ack: $DEV,A,<value>,*
