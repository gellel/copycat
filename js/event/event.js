// Register command hotkey listener. Awaits cmd+shift+e pattern.
chrome.commands.onCommand.addListener(function(command) {
	// Find active tab in Chrome.
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// Request information from content script appended to active tab.
		chrome.tabs.sendMessage(tabs[0].id, {status:'copycat_question'}, function (contentReply) {
			// Manage response from content script on active tab.
			alert(JSON.stringify(contentReply))
		});
	});
});

// Register listener for user opening Chrome extension popup page. 
chrome.extension.onConnect.addListener(function (extensionPort) {
	// Handle connection request from Chrome extension popup page.
	extensionPort.onMessage.addListener(function () {
		// Dispatch response to extension popup page.
		extensionPort.postMessage({status:'copycat_sending_to_popup'});
	});
});
