// Register message listener from event script. 
chrome.runtime.onMessage.addListener(function (eventDispatch, eventData, sendEventReplyMessage) {
	// Respond to event script.
	sendEventReplyMessage({ copycat: { status: 'replying', from: 'content.js' }, content: window.getSelection() });
});