// Register connection port.
let extensionPort = chrome.extension.connect({ name: 'copycat' });

// Post message to event script. Inititalises fetch.
extensionPort.postMessage({ copycat: { status: 'sending', from: 'popup.js' } });

// Register message listener from event script. 
extensionPort.onMessage.addListener(function (eventData) {
	
	document.body.style.cssText = 'width:200px;height:200px;';

	document.body.insertTextNode("HIIII")

	console.log(eventData)

	chrome.browserAction.setBadgeText({ text: '' })

});