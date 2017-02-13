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

	sendResponse({ 
		store: false,
		tab: window.location, 
		text: window.getSelection().toString(), 
		meta: (function() {
			let a = [
				'keywords', 'description', 'subject', 
				'copyright', 'language', 'abstract', 
				'topic', 'summary', 'author', 
				'owner', 'url', 'pagename', 
				'twitter:card', 'twitter:site', 'twitter:title', 
				'twitter:description', 'twitter:creator', 'twitter:image:src'
			];
		    for (var t = {}, i = 0, d = document.head.getElementsByTagName('meta'), e = d.length; i < e; i++) 
		    		d[i].name && d[i].content && a.indexOf(d[i].name.toLowerCase()) > -1 && (t[d[i].name.toLowerCase()] = d[i].content);
		    return t;
		}())
	});
});

