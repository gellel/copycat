/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Extension.port = Extension.browser.runtime.connect({ 
	/**
	*** Open two-way communication.
	*
	* Connect to event page.
	* Enables messaging between scripts.
	* Connection detached on popup close.
	*
	**/
	name: Extension.manifest.name });


Extension.port.postMessage(
	/**
	*** Send message to event page.
	*
	* Prompts message handler.
	* Event listener on event page sends copies.
	* Expected to occur on popup open only.
	*
	**/
	new Object());


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

	message.copies = (message.copies instanceof Array ? message.copies :  new Array()).map(JSON.parse);

	for (let i = 0; i < message.copies.length; i++) Extension.article(document.body, message.copies[i]);
});


Extension.browser.storage.sync.get(Extension.manifest.name, function (storage) {
	/**
	*** Fetch extension storage object.
	*
	* Get browser storage data.
	* Uses extension manifest name for browser extension pairing.
	* First instance initialisation has empty object returned.
	*
	**/

	storage.copies = (storage.copies instanceof Array ? storage.copies :  new Array()).map(JSON.parse);

	for (let i = 0; i < storage.copies.length; i++) Extension.article(document.body, storage.copies[i]);
});

