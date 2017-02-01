// Register connection port.
let extensionPort = chrome.extension.connect({ name: 'copycat' });

// Request information from event script.
extensionPort.postMessage({status:'copycat_opened'});

// Register message listener from event script. 
extensionPort.onMessage.addListener(function (copycat) {
	//
	document.body.insertNode('p', 'HELLO FROM COPYCAT')
	console.log(copycat)

});