/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


CopyCat.browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	/**
	*** Manage event page message.
	*
	* Message object set from event page.
	* Sender object contains extension id.
	* Response function dispatches message to event page.
	*
	*** Send message to event page.
	*
	* Message response must be object.
	* Message object contains single object key.
	* Sends page data from active tab and highlighted text.
	*
	*** Function called from using extension key pattern.
	*
	**/

	sendResponse({ page: { tab: window.location, text: window.getSelection().toString() }});
});