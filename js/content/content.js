// Register message listener from event script. 
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// Respond to event script.
	sendResponse({ copycat: { status: 'replied', from: 'content.js', action: 'copied_data' }, content: window.getSelection() });
});