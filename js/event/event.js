/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Extension.copies = new Array();


Extension.browser.commands.onCommand.addListener(function (command) {
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

	// Find current active tab. Searches across opened windows.
	Extension.browser.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// Send message to active tab. Await content page response.
		Extension.browser.tabs.sendMessage(tabs[0].id, {}, function (message) {
			// Manage message object.
			if (message.text) 
				// Modify extension badge.
				Extension.browser.browserAction.setBadgeText({ 
					// Append message object to copies array.
					// Edit extension badge to display copies total.
					text: Extension.copies.append(message).set().length.toString() });
		});
	});
});


Extension.browser.runtime.onConnect.addListener(function (extensionPort) {
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

	// Connection from popup page. Manage message object.
	extensionPort.onMessage.addListener(function (message, sender, sendResponse) {
		
		switch (message.event) {
		
			case 'popup_page_opened':
				
				// Send message to popup page.
				extensionPort.postMessage({ 
					copies: Extension.copies });
				
				break;
			
			case 'popup_page_reading_copies':
				
				Extension.browser.browserAction.setBadgeText({ 
					// Empty message contents to array.
					// Edit extension icon badge text to empty.
					text: Extension.copies.empty().toString() });
				
				break;
		};
	});
});

