/*
 *	Content script for browser extension.
 *	Manages communication between content.js and event.js.
 *	File appended to opened tabs.
*/


// Active tab message handler.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// Manage message response to event script.
	// Share status object and page content selection.
	// Stringify content to prevent CORS issue.
	sendResponse({ copycat: { type: 'message', from: 'content.js', to: 'event.js', context: 'extension_fetch_content' }, content: JSON.stringify({ page: window.location, selection: window.getSelection().toString() }) });
});