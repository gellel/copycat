content = new Array();


// Extension key pattern handler.
chrome.commands.onCommand.addListener(function (command) {
	// Manage CopyCat copy text key pattern.
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// Find browser active tab.
		// Send message to content script for active tab.
		// Share status object.
		chrome.tabs.sendMessage(tabs[0].id, { copycat: { type: 'message', from: 'event.js', to: 'content.js', context: 'extension_pattern_typed' } }, function (message) {
			// Manage active tab message response.
			chrome.browserAction.getBadgeText({}, function (text) {
				// Append message content to shared resource array.
				// Empty duplicate data from array.
				// Set extension badge to content length.
				chrome.browserAction.setBadgeText({ text: content.append(message.content).set().length.toString() });
			});
		});
	});
});


// Extension popup connection handler.
chrome.runtime.onConnect.addListener(function (extensionPort) {
	// Manage connection from popup page.
	extensionPort.onMessage.addListener(function (message, sender, sendResponse) {
		// Handle popup page connection context.
		switch (message.copycat.action) {
			// Extension opened.
			// User has opened CopyCat extension.
			case 'extension_opened':

				extensionPort.postMessage({ copycat: { type: 'message', from: 'event.js', to: 'popup.js', context: 'extension_connection_popup' }, content: content });
				
				break;
			// Extension responded to event script.
			// Application has processed initial connection.
			case 'extension_accepted_data':
				
				chrome.browserAction.setBadgeText({ text: '' });
				
				content.empty();
				
				break;
		}
	});
});
