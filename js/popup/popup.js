/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Extension.port = Extension.browser.runtime.connect({ name: Extension.manifest.name });


Extension.port.postMessage({ event: 'popup_page_opened' });
	

Extension.port.onMessage.addListener(function (message, sender) {
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

	Extension.port.postMessage({ event: 'popup_page_reading_copies' });




	console.log(message.copies)

	

});

