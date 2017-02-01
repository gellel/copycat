
// Register command hotkey listener. Awaits cmd+shift+e pattern.
chrome.commands.onCommand.addListener(function (command) {
	// Find active tab in Chrome.
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// Request information from content script appended to active tab.
		chrome.tabs.sendMessage(tabs[0].id, { copycat: { status: 'sending', from: 'event.js' } }, function (contentReply) {
			// Manage response from content script on active tab.
			chrome.browserAction.getBadgeText({}, function (text) {

				text = ((typeof text === 'string') && (!isNaN(parseInt(text)))) ? parseInt(text) + 1 : 1;

				chrome.browserAction.setBadgeText({ text: text.toString() })


			})
		});
	});
});

// Register listener for user opening Chrome extension popup page. 
chrome.extension.onConnect.addListener(function (extensionPort) {
	// Handle connection request from Chrome extension popup page.
	extensionPort.onMessage.addListener(function () {
		// Dispatch response to extension popup page.
		extensionPort.postMessage({ copycat: { status: 'sending', from: 'event.js' } });
	});
});
