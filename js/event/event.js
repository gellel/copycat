/**
 * Chrome Event-Script.
 * Manages Event-Script to Content-Script, Active-Tab communication.
 * Manages Event-Script to Popup-Script, Popup-Tab communication.
 * Inititalised across all Chrome instances and windows.
**/


// Set empty array to contain shared data.
content = new Array();

// Register command hotkey listener. Awaits cmd+shift+e pattern.
chrome.commands.onCommand.addListener(function (command) {
	// Find active tab in Chrome.
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// Request information from content script appended to active tab.
		chrome.tabs.sendMessage(tabs[0].id, { copycat: { status: 'sent', from: 'event.js', action: 'command_run' } }, function (message) {
			// Manage response from content script on active tab.
			chrome.browserAction.getBadgeText({}, function (text) {
				// Incriment Chrome extension badge copies count.
				chrome.browserAction.setBadgeText({ text: content.append(message.content).set().length.toString() });
			});
		});
	});
});

// Register listener for user opening Chrome extension popup page. 
chrome.runtime.onConnect.addListener(function (extensionPort) {
	// Handle connection request from Chrome extension popup page.
	extensionPort.onMessage.addListener(function (message, sender, sendResponse) {
		// Handle action context for Chrome extension popup.
		switch (message.copycat.action) {
			// Initial connection.
			case 'extension_opened':
				// Dispatch response to extension popup page.
				extensionPort.postMessage({ copycat: { status: 'replied', from: 'event.js', action: 'shared_data' }, content: Array.from(new Set(content)) });
				break;
			// Managed data share from event script.
			case 'extension_accepted_data':
				// Reset badge.
				chrome.browserAction.setBadgeText({ text: '' });
				// Reset data array.
				content = new Array();
				break;
		}
	});
});
