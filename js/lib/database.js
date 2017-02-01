/**
	clearing previous instances
**/
//indexedDB.deleteDatabase("copycat"); 

/**
	defining base API wrapper
**/
let database__API = {};

database__API.indexedDB = {};
database__API.indexedDB.db = null;

database__API.method = {};

/**
	creating simple error logger for indexedDB function
**/
database__API.indexedDB.onerror = function (errorEvent) {
	console.log("database error encountered.", errorEvent);
};

/**
	creating main function to fetch our database to work with
**/
database__API.indexedDB.open = function (openEvent) {
	/**
		creating our base variables
	**/
	database__API.indexedDB.name = "copycat";
	database__API.indexedDB.version = 1;
	database__API.indexedDB.request = indexedDB.open(database__API.indexedDB.name, database__API.indexedDB.version);

	/**
		versioning the database
	**/
	database__API.indexedDB.request.onupgradeneeded = function (upgradeEvent) {
		let db = upgradeEvent.target.result;

		upgradeEvent.target.transaction.onerror = database__API.indexedDB.onerror;

		if (db.objectStoreNames.contains(database__API.indexedDB.name)) {
			db.deleteObjectStore(database__API.indexedDB.name);
		}

		let store = db.createObjectStore(database__API.indexedDB.name, { keyPath: "id", autoIncrement: true });
	};
	/**
		retreiving the database when available
	**/
	database__API.indexedDB.request.onsuccess = function (successEvent) {
		database__API.indexedDB.db = successEvent.target.result;
		database__API.indexedDB.callback();
	};
	/**
		logging the encountered error when attempting the fetch the database
	**/
	database__API.indexedDB.request.onerror = database__API.indexedDB.onerror;
};

database__API.indexedDB.init = function (callback) {
	database__API.indexedDB.callback = callback || function () {};
	database__API.indexedDB.open();
}


database__API.method.transaction = {};


database__API.method.handlers = {};

database__API.method.handlers.parameters = function (supplied) {
	/**
		collect arguments from function
	**/
	let parameters = supplied;
	
	if (!parameters.length) return false;

	/**
		fetch the database transaction method relative to the defined base path for the database__API
	**/
	let transaction = database__API.indexedDB.db.transaction([database__API.indexedDB.name], "readwrite");
	/**
		access the object storage method for the defined database 
	**/
	let store = transaction.objectStore(database__API.indexedDB.name);

	return { parameters: parameters, transaction: transaction, store: store };
}

database__API.method.handlers.callback = function (supplied, request) {
	if (supplied.length > 1) {
		let callback = supplied.slice(-1)[0];

		if (typeof callback === "object") {
			request.onsuccess = callback.success;
			request.onerror = callback.onerror;
		}
		else {
			request.onsuccess = callback;
		}
	}
}

database__API.method.transaction.add = function () {
	let handlers = database__API.method.handlers.parameters(Array.prototype.slice.call(arguments));

	if (!handlers.parameters) return;

	let request = handlers.store.put(handlers.parameters[0]);

	database__API.method.handlers.callback(handlers.parameters, request);
};

database__API.method.transaction.addMultiple = function (data, callback) {
	let added_data = [];
	if (data) {
		for (let i = 0; i < data.length; i++) {
			database__API.method.transaction.add(data[i], function (successEvent) {
				added_data.push(successEvent);
			});
		}
	}
	if (callback) callback(added_data);
};

database__API.method.transaction.get = function () {
	let handlers = database__API.method.handlers.parameters(Array.prototype.slice.call(arguments));

	if (!handlers.parameters) return;

	let request = handlers.store.get(handlers.parameters[0]);

	database__API.method.handlers.callback(handlers.parameters, request);
};

database__API.method.transaction.getAll = function (callback) {
	/**
		fetch the database transaction method relative to the defined base path for the database__API
	**/
	let transaction = database__API.indexedDB.db.transaction([database__API.indexedDB.name], "readonly");
	/**
		access the object storage method for the defined database 
	**/
	let store = transaction.objectStore(database__API.indexedDB.name);
	/**
		create cursour
	**/
	let request = store.openCursor();
	/**
		create temporary storage for all requested keys
	**/
	let keys = [];
	/**
		flag for async complete
	**/
	let flag = false;

	request.onsuccess = function (successEvent) {
		let cursor = successEvent.target.result;

		if (cursor) {
			keys.push(cursor.value);
			cursor.continue();
		}
		else {
			flag = true;
		}

		if (flag) {
			if (callback) {
				callback(keys);
			}
		}
	};
};

database__API.method.transaction.delete = function () {
	let handlers = database__API.method.handlers.parameters(Array.prototype.slice.call(arguments));

	if (!handlers.parameters) return;

	let request = handlers.store.delete(handlers.parameters[0]);

	database__API.method.handlers.callback(handlers.parameters, request);
};



