/*
 *	Popup script for browser extension.
 *	Manages communication between event.js and popup.js.
 *	File appended to popup page.
*/

// Set extension name referral constant.
const name = 'copycat';

// Register extension connection port.
// Set connection name to extension name.
let extensionPort = chrome.runtime.connect({ name: name });

// Establishes initial connection.
// Send message to event script confirming connection.
extensionPort.postMessage({ event: 'popup_page_opened' });

// Register message listener from event script. 
extensionPort.onMessage.addListener(function (message, sender) {
	// Post message to event script. Manages status and application cleanup.
	extensionPort.postMessage({ event: 'popup_page_reading_copies' });
	
	document.body.style.cssText = 'width:200px;height:200px;';

	console.log(message)


});


chrome.storage.sync.get(name, function (chromeStorage) {

	//console.log(chromeStorage)

	chrome.storage.sync.set({ name: { name: { key: 'lol' } }})

});