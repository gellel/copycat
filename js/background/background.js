let copied__data = [];

/**
	connection handler to content.js
	accepts two-way communication of js objects
**/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message) {
		sendResponse({ message: sender });
		copied__data.push(message);
	}
});

/**
	connection handler to extension.js
	accepts two-way communication of js objects
**/
chrome.extension.onConnect.addListener(function (extensionPort) {
	/** 
		once extension pop up is opened
		send array of data from temporary array
	**/
	extensionPort.onMessage.addListener(function () {
		/**
			send physical data
		**/
		extensionPort.postMessage(copied__data);
		/**
			clear data to prevent duplication
		**/
		copied__data = [];
	});
});