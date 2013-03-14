revHome
=======

Setup:

Raspberry pi:
  connected to the main dhcp server via ethernet/wifi


Device config
  .Id
  .Previous device Id
  .Next device Id
  .Group Id
  .Type (Switcher/Router)

Available remote commands sent by the server
  - Write commands
    . Turn on
    . Turn off
  - Read commands
    . On/Off status
    . Sensor data


Events
  - Device registration. Device turns on and sends registration command to server in order to receive new commands
  - Device status change
  - Read data

Communication
  This system will have it's devices communicating by JSON strings through a 433 mhz wireless serial field
  
Network
  Mesh network will be implemented. This way every request will jump sequencially by every device until reaches it's final destinatary.
