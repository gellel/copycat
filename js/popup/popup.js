/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


/**
*** Extension manager.
*
* Establishes port between popup and event page.
*
**/
let extensionPort = chrome.runtime.connect({ name: Extension.manifest.name });


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

		for (let i = 0; i < message.copies.length; i++) {

			if (message.copies[i] instanceof Object) {


				main.insertNode('article', { style: 'margin: 5px; padding: 5px; border: 1px solid #e1e1e1;'}, function (article) {


					article.insertNode('p', message.copies[i].text)

				});

			}	
		}
		
	});

});

