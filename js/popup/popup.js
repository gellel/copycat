/*
 *	Popup script for browser extension.
 *	Manages communication between event.js and popup.js.
 *	File appended to popup page.
*/


/**
*** Extension manager.
*
* Establishes port between popup and event page.
*
**/
let extensionPort = chrome.runtime.connect({ name: CopyCat.name });


/**
*** Ping event page.
*
***/
extensionPort.postMessage({ event: 'popup_page_opened' });
	


extensionPort.onMessage.addListener(function (message, sender) {

	/**
	*** Manage event page connection.
	*
	* User opened browser extension popup page.
	* Sends copied array from event page to pop up page 
	* Response cleared after popup page is closed.
	*
	** Send message to event script.
	*
	* Message response must be object.
	* Message object contains popup page object argument.
	* Assumes content script is to find page data from active tab and highlighted text.
	*
	**/

	extensionPort.postMessage({ event: 'popup_page_reading_copies' });


	/**
	*** Begin spaghetti code.
	*
	* Testing UI 
	* 
	**/

	console.log(message.copies)

	document.body.insertNode('main', {}, function (main) {

		
	});

});

