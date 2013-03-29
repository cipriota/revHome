var currentData;
var numColumns = 3;
var firstRun = true;

$(function() {

	fetchDataStatus();	

});

function init() {

	initDisplay();

	refreshDisplay();

	initMouseActions();
	
	//setInterval(fetchDataStatus, 2000);
	
	firstRun = false;
	
}

function fetchDataStatus() {
	
	currentData=[{ "id": 1, "description": "Livingroom", "devices":[ { "id": 1, "state": true, "type": "lamp", "description": "Left head light" }, { "id": 2, "state": false, "type": "lamp", "description": "Right head light" }, { "id": 3, "state": false, "type": "outlet", "description": "Heater" }	 ] }, { "id": 2, "description": "Bedroom", "devices":[ { "id": 1, "state": true, "type": "lamp", "description": "device 1" }, { "id": 2, "state": true, "type": "lamp", "description": "device 2" }, { "id": 3, "state": false, "type": "lamp", "description": "device 3" }]}];
	init();
	/*
	$.ajax({
		url: "getData.php",
		async: true,
		dataType: 'json'
	})
	.done(function(data) { 
		currentData = data; 
		
		if (!firstRun) {
			refreshDisplay();
		} else {
			init();
		}
	})
	.fail(function() {});
	*/
}

function initDisplay() {
	var container = $('.container')[0];

	for(var i in currentData) {
		var groupElem = $('<div>');
		var titleElem = $('<div>');
		var contentElem = $('<div>');
		var dropElem = $('<div>');	
		var devices;

		group = currentData[i];

		titleElem.addClass('title');
		titleElem.addClass('click');
	
		contentElem.addClass('content');
		contentElem.addClass('off');

		devices = group.devices;

		for(var j in devices) {
			var deviceElem = $('<div>');
			var iconElem = $('<div>');
			var descElem = $('<div>');

			var device = devices[j];
			
			iconElem.addClass('icon');
			iconElem.addClass('click');
			iconElem.addClass(device.type);
			iconElem.css('background-size', '200 200');
			iconElem.bind('click', function() {
				if ($(this).hasClass('on')) {
					$(this).switchClass('on', 'off');
				} else {
					$(this).switchClass('off', 'on');
				}
			});
			
			descElem.addClass('description');
			descElem.text(device.description);
			
			deviceElem.attr('id', 'device-' + device.id);
			deviceElem.addClass('device');
			deviceElem.css('width', 100/numColumns+'%');
			deviceElem.append(iconElem);
			deviceElem.append(descElem);
			if (j >= numColumns) {
				deviceElem.addClass('clearRight');
			}
			
			contentElem.append(deviceElem);
		}

		groupElem.attr('id', 'group-' + group.id);
		groupElem.addClass('group');
		groupElem.append(titleElem);
		groupElem.append(contentElem);

		$(container).append(groupElem);

	}
}

function refreshDisplay() {

	for (var i in currentData) {
		var group = currentData[i];
		var titleElem = $('#group-'+group.id).children('.title')[0];

		$(titleElem).text(group.description);
		
		for (var j in group.devices) {
			var device = group.devices[j];
			var iconElem = $('#group-'+group.id).find('#device-'+device.id).children('.icon')[0];
			
			$(iconElem).removeClass('on').removeClass('off');
			
			if (device.state) {
				$(iconElem).addClass('on');
			} else {
				$(iconElem).addClass('off');
			}
		}
	}
};

function initMouseActions() {
	
	$('.title').each(function() {	
		$(this).bind('click', function() {
				var content = $(this).parent().children('.content');

				if ($(content).hasClass("on")) {
					$(content).switchClass("on", "off", 100, "easeOutSine");
				} else {
					$(content).switchClass("off", "on", 100, "easeOutSine");
				}
				
		});
	});
}
