/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Extension.browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
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

	// Send message object to event page.
	sendResponse({ 
		date: new Date(), 
		tab: window.location, 
		text: window.getSelection().toString(), 
		meta: (function () {
			let names = ['keywords', 'description', 'subject', 'copyright', 'language', 'abstract', 'topic', 
			'summary', 'author', 'owner', 'url', 'pagename', 
			'twitter:site', 'twitter:card', 'twitter:title', 'twitter:description'];

			let tags = {};

			for (var i = 0, n = document.head.getElementsByTagName('meta'), l = n.length; i < l; i++) {
				if (n[i].name && n[i].content)

					if (names.indexOf(n[i].name.toLowerCase()) > -1)
						tags[n[i].name.toLowerCase()] = n[i].content;
			}

			return tags;
		}()) 
	});
});

