// Register extension connection port.
let extensionPort = chrome.extension.connect({ name: 'copycat' });

// Post message to event script. Inititalises shared data fetch.
extensionPort.postMessage({ copycat: { status: 'sent', from: 'popup.js' } });

// Register message listener from event script. 
extensionPort.onMessage.addListener(function (message, sender) {
	
	document.body.style.cssText = 'width:200px;height:200px;';


	chrome.browserAction.setBadgeText({ text: '' })

});