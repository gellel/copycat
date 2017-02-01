// Register message listener from event script. 
chrome.runtime.onMessage.addListener(function (eventDispatch, eventData, sendEventReplyMessage) {
	
	console.log('copycat just got a request!');
	// Dispatch response to event script.
	sendEventReplyMessage({status:'copycat_answer'}, function () {
		console.log('copycat finished sending information back.')
	});
});