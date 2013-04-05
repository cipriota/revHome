<?php
ignore_user_abort(true);
set_time_limit(0);

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
$address = localhost;
$service_port = 4665;

if ($socket === false) {
    echo "ERROR";
    return;
}

$result = socket_connect($socket, $address, $service_port);

if ($result === false) {
	echo "ERROR";
	return;
}

$query = "\$WEB,R,*\n";

socket_write($socket, $query, strlen($query));

$buf = "";
socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, array('sec'=>5, 'usec'=>0));
if (false !== ($bytes = socket_recv($socket, $buf, 2048, 0))) {
	echo $buf;
}

socket_close($socket);

?>