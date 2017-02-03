/*
 *	Event script for browser extension.
 *	Manages communication between content.js and popup.js.
 *	File appended to background page.
*/


CopyCat.copies = new Array();


CopyCat.browser.commands.onCommand.addListener(function (command) {
	/**
	*** Manage extension key patterns.
	*
	* Commands registered for browser instance.
	* Awaits pattern used in opened browser. 
	* Key pattern required to match command/control+shift+e.
	*
	*** Find selected tab.
	*
	* Fetches ID for current active tab.
	* Active tabs are registered across different browser windows and instances.
	* Throws error if extension internals are being inspected and pattern performed.
	*
	** Send message to active tab script.
	*
	* Message response must be object.
	* Message object contains empty object argument.
	* Assumes content script is to find page data from active tab and highlighted text.
	*
	**/

	CopyCat.browser.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {

		CopyCat.browser.tabs.sendMessage(tabs[0].id, {}, function (message) {

			CopyCat.browser.browserAction.setBadgeText({ text: CopyCat.copies.append(message.page).set().length.toString() });

		});
	});
});


CopyCat.browser.runtime.onConnect.addListener(function (extensionPort) {
	/**
	*** Manage extension popup opened.
	*
	* Connection registered across all browser instances.
	* Requires user to open main extension. 
	* Closing popup terminates connection.
	*
	*** Manage popup page message.
	*
	* Message object set from opened extension page.
	* Sender object contains extension id.
	* Response function dispatches message to popup page page.
	*
	**/

	extensionPort.onMessage.addListener(function (message, sender, sendResponse) {
		
		switch (message.event) {
		
			case 'popup_page_opened':
				
				extensionPort.postMessage({ copies: CopyCat.copies });
				
				break;
			
			case 'popup_page_reading_copies':
				
				CopyCat.browser.browserAction.setBadgeText({ text: (CopyCat.copies.empty() ? "" : "") });
	
				break;
		};
	});
});

