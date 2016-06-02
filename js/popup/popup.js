let extensionPort = chrome.extension.connect({name: "copycat"});


/** 
	send basic message to background.js
	to establish two-way connection
**/
extensionPort.postMessage({ status: "fetch" });

/**
	listen for response from background.js
	upon received set up page
**/
extensionPort.onMessage.addListener(function(copied__data) {

	/**
		after connection has been established connect to indexeddb
	**/
	database__API.indexedDB.init(function () {

		/**
			store all passed data from background.js that was copied from content.js
		**/
		database__API.method.transaction.addMultiple(copied__data, function (data__added) {

			/**
				retrieve all data created past and present
			**/
			database__API.method.transaction.getAll(function (found__data) {

				for (let i = 0; i < found__data.length; i++) {

					document.body.insertNode("p", found__data[i].text);
				}

			});

		});

	});

});