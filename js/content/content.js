chrome.runtime.onMessage.addListener(function (eventDispatch, eventData, sendEventReplyMessage) {
	
	console.log(eventData);

	sendEventReplyMessage({status:'copycatreply!'}, function () {

	});
});