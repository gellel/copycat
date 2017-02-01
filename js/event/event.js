chrome.commands.onCommand.addListener(function(command) {
	
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		
		chrome.tabs.sendMessage(tabs[0].id, {status:'copycatask!'}, function (contentReply) {
			alert(contentReply)
		});

	});
});