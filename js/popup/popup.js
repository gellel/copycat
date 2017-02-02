const name = 'copycat';

// Register extension connection port.
let extensionPort = chrome.extension.connect({ name: name });

// Post message to event script. Establishes initial connection.
extensionPort.postMessage({ copycat: { status: 'sent', from: 'popup.js', action: 'extension_opened' } });

// Register message listener from event script. 
extensionPort.onMessage.addListener(function (message, sender) {
	// Post message to event script. Manages status and application cleanup.
	extensionPort.postMessage({ copycat: { status: 'sent', from: 'popup.js', action: 'extension_accepted_data' } });
	
	document.body.style.cssText = 'width:200px;height:200px;';

	console.log(message)

});


chrome.storage.sync.get(name, function (chromeStorage) {

	console.log(chromeStorage)

	chrome.storage.sync.set({ name: { name: { key: 'lol' } }})

});