
// Register command hotkey listener. Awaits cmd+shift+e pattern.
chrome.commands.onCommand.addListener(function (command) {
	// Find active tab in Chrome.
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// Request information from content script appended to active tab.
		chrome.tabs.sendMessage(tabs[0].id, { copycat: { status: 'sent', from: 'event.js' } }, function (message) {
			// Manage response from content script on active tab.
			chrome.browserAction.getBadgeText({}, function (text) {
				// Incriment Chrome extension badge copies count.
				chrome.browserAction.setBadgeText({ text: (!isNaN(parseInt(text)) ? parseInt(text) + 1 : 1).toString() })
				
			});
		});
	});
});

// Register listener for user opening Chrome extension popup page. 
chrome.extension.onConnect.addListener(function (extensionPort) {
	// Handle connection request from Chrome extension popup page.
	extensionPort.onMessage.addListener(function (message, sender, sendResponse) {
		// Dispatch response to extension popup page.
		extensionPort.postMessage({ copycat: { status: 'replied', from: 'event.js' } });
	});
});
