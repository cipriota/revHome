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
  Mesh network will be implemented. This way every request will jump sequencially by every device until reaches it's final destinatary. Every device listens to the transmitting message. Subsequent devices must be within reach with each other.

  Example: Sending a message to device id 3 in a 4 device network
  
  [Server] -> [Device 1] -> [Device 2] -> [Device 3] x [Device 4]
  
Communication
-
  This system will have it's devices communicating by JSON strings through a 433 mhz wireless serial field.
  
  Each transmission must contain sender and destinatary id's. This way every device knows if needs to resend the message.
  
  Server<->Device link protocol:
  	Server->Server Device (read command)
  		Req: $SER,R,*
  		Ack: $DEVC,A,<value>,*
  	
  	Server->Server Device (set command)
  		Req: $SERV,W,<value>,*
  		Ack: $DEV,A,<value>,*
