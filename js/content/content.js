/**
 * Chrome Content-Script.
 * Manages Active-Tab Content-Script to Event-Script communication.
 * Inititalised across all Chrome instances, windows and tabs.
**/

// Initialise Chrome event listener for Content Script.
// Content script awaits message dispatched from shared Event Script.
// Handle content selection for selected Chrome tab. 
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// Set CopyCat status object.
	copycat = { status: 'replied', from: 'content.js', action: 'copied_data' };
	// Set CopyCat content object. 
	// Uses content selected from Chrome active tab.
	// Stringify content to enable data to be shared across JavaScript scopes.
	content = JSON.stringify({ window: window.location, content: window.getSelection().toString() });
	// Send response message to Event Script for handling.
	sendResponse({ copycat: copycat, content: content });
});