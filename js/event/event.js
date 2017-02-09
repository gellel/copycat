/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Extension.browser.storage.sync.get(Extension.manifest.name, function (storage) {
	/**
	*** Fetch storage cache.
	*
	* Get browser storage data.
	* Uses extension manifest name for browser pairing.
	* First instance initialisation has empty object returned.
	*
	**/

	// Set default array reference for browser storage.
	storage.copies = storage.copies instanceof Array ? storage.copies :  new Array();

	// Set array for content sent from content page.
	let copies = new Array();

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

			if (tabs[0] && tabs[0].id)
				Extension.browser.tabs.sendMessage(tabs[0].id, {}, function (message) {
					if (message && message.text) 
						
						Extension.browser.browserAction.setBadgeText({ 
							text: copies.append(JSON.stringify(message)).set().length.toString() });

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

			switch (message.event) {
			
				case 'popup_page_opened':
					extensionPort.postMessage({
						copies: storage.copies.concat(copies).set() });
					
					break;
				
				case 'popup_page_reading_copies':
					Extension.browser.browserAction.setBadgeText({ 
						text: copies.empty().toString() });
					
					break;
			};
		});
	});
});