let copied__data = [];


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	
});

chrome.extension.onConnect.addListener(function (extensionPort) {

	extensionPort.onMessage.addListener(function () {
		
		extensionPort.postMessage(copied__data);
		
	});
});