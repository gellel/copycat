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
	*** Find selected tab.
	*
	* Fetches ID for current active tab.
	* Active tabs are registered across different browser windows and instances.
	* Throws error if extension internals are being inspected and pattern performed.
	*
	**/

	Extension.browser.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		/**
		*** Send message to active tab script.
		*
		* Message response must be object.
		* Message object contains empty object argument.
		* Assumes content script is to find page data from active tab and highlighted text.
		*
		**/

		// Test current tab found and contains id.
		if (tabs[0] && tabs[0].id)
			// Find active tab.
			Extension.browser.tabs.sendMessage(tabs[0].id, {}, function (message) {
				// Test message response and contains text.
				if (message && message.text) 
					// Edit extension badge icon.
					Extension.browser.browserAction.setBadgeText({ 
						text: Extension.copies.append(JSON.stringify(message)).set().length.toString() });
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
	**/


	extensionPort.onMessage.addListener(function (message, sender, sendResponse) {
		/**
		*** Manage popup page response.
		*
		* Message object set from opened extension page.
		* Sender object contains extension id.
		* Response function dispatches message to popup page page.
		*
		**/

		// Send message to popup page.
		extensionPort.postMessage({
			copies: Extension.copies.set() });		
	});


	extensionPort.onDisconnect.addListener(function (sender) {
		/**
		*** Manage popup page closed.
		*
		* Disconnects from extension port.
		* Sender object contains extension id.
		*
		**/

		// Edit extension badge icon.
		Extension.browser.browserAction.setBadgeText({ 
			text: Extension.copies.empty().toString() });

		// Fetch synced data.
		Extension.browser.storage.sync.get(Extension.manifest.name, function (storage) {
			console.log(storage) });
	});
});
