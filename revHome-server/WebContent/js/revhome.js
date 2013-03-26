var data;

$(function() {

	initMouseActions();

	fetchDataStatus();

	initDisplay();

	refreshDisplay();

	initMouseActions();

});

function fetchDataStatus() {
	data = [
	{
		"id": 1,
		"description": "group Description 1",
		"devices":[
			{ "id": 1, "state": true, "description": "device 1" },
			{ "id": 2, "state": false, "description": "device 1" },
			{ "id": 3, "state": false, "description": "device 1" }		
		]
	},
	{
		"id": 2,
		"description": "group Description 2",
		"devices":[
			{ "id": 1, "state": true, "description": "device 1" },
			{ "id": 2, "state": true, "description": "device 2" },
			{ "id": 3, "state": false, "description": "device 3" }		
		]
	}
];

}

function initDisplay() {
	var container = $('.container')[0];

	for(var i in data) {
		var groupElem = $('<div>');
		var titleElem = $('<div>');
		var contentElem = $('<div>');
		var devices;

		group = data[i];

		titleElem.addClass('title');
		titleElem.text(group.description);
	
		contentElem.addClass('content');
		contentElem.addClass('off');

		devices = group.devices;

		for(var j in devices) {
			var deviceElem = $('<div>');
			var iconElem = $('<div>');
			var descElem = $('<div>');

			var device = devices[j];

			iconElem.addClass('icon');
			iconElem.addClass('off');


			descElem.addClass('description');
			descElem.text(device.description);
			
			deviceElem.attr('id', device.id);
			deviceElem.addClass('device');
			deviceElem.append(iconElem);
			deviceElem.append(descElem);
			
			contentElem.append(deviceElem);
		}

		groupElem.attr('id', group.id);
		groupElem.addClass('group');
		groupElem.append(titleElem);
		groupElem.append(contentElem);

		$(container).append(groupElem);

	}
}

function refreshDisplay() {
	
	for (var i in data) {
		var group = data[0];

		for (var j in group.devices) {
			var device = group.devices[j];

				console.log($('#'+group.id));
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
