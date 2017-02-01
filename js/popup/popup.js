let extensionPort = chrome.extension.connect({name: "copycat"});


extensionPort.postMessage({ status: "fetch" });


extensionPort.onMessage.addListener(function(copycat) {

	alert('connected to something')

});