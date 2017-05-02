/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

/* set application size. */
document.body.style.width = '600px';

Extension.HTML = { 
	/* set application root. */
	copies: document.body.querySelector(
		'[data-extension-app="copycat"]') };


Extension.build = {

	copies: function (sequence, n) {
		/* set sequence object. */
		sequence = sequence instanceof Object ? 
			sequence : new Object();
		/* set sequence copies key as array. */
		sequence.copies = sequence.copies instanceof Array ? 
			sequence.copies : new Array();
		/* format array contents. */
		sequence.copies = sequence.copies.map(function (i) { 
			return typeof i === 'string' ? JSON.parse(i) : i; });	
		/* iterate for copies sequence. */
		for (let i = 0, s = sequence.copies, l = s.length; i < l; i++) {
			/* set key id. */
			s[i].id = (new Date().getTime());
			/* create copy cat element. */
			Extension.HTML.copies.appendChild(
				document.createElement('copycat-element').appendProperties({
					title: s[i].title, source: s[i].tab.host, text: s[i].text, href: s[i].tab.href }));
		}
		
		/* store keys. */
		Extension.manage.store(sequence, n);
	}
};

Extension.manage = {

	store: function (sequence, n) {
		/* set sequence object. */
		sequence = sequence instanceof Object ? 
			sequence : new Object();
		/* set sequence copies key as array. */
		sequence.copies = sequence.copies instanceof Array ? 
			sequence.copies : new Array();
		/* store copied contents. */
		if (sequence.copies.length) 
			chrome.storage.sync.set({[n]: sequence});
	},

	remove: function (sequence, id, n) {
		/* set sequence object. */
		sequence = sequence instanceof Object ? 
			sequence : new Object();
		/* set sequence copies key as array. */
		sequence.copies = sequence.copies instanceof Array ? 
			sequence.copies : new Array();
		
		let key = undefined;

		for (let i = 0, s = sequence.copies, l = s.length; i < l && !(key); i++) {
			console.log(s[i].id)
			if (s[i].id === id) key = i;
		}

		if (typeof key === 'number') console.log(sequence.copies[key], 'found!')
	}
};


Extension.port = Extension.browser.runtime.connect({ 
	/**
	*** Open two-way communication.
	*
	* Connect to event page.
	* Enables messaging between scripts.
	* Connection detached on popup close.
	*
	**/

	name: Extension.manifest.name });


Extension.port.postMessage(
	/**
	*** Send message to event page.
	*
	* Prompts message handler.
	* Event listener on event page sends copies.
	* Expected to occur on popup open only.
	*
	**/

	new Object());


Extension.port.onMessage.addListener(function (message, sender) {
	/**
	*** Manage event page connection.
	*
	* User opened browser extension popup page.
	* Sends copied array from event page to pop up page 
	* Response cleared after popup page is closed.
	*
	** Send message to event script.
	*
	* Message response must be object.
	* Message object contains popup page object argument.
	* Assumes content script is to find page data from active tab and highlighted text.
	*
	**/

	Extension.browser.storage.sync.get(Extension.manifest.name, function (storage) {
		/**
		*** Fetch extension storage object.
		*
		* Get browser storage data.
		* Uses extension manifest name for browser extension pairing.
		* First instance initialisation has empty object returned.
		*
		**/

		let n = Extension.manifest.name;

		Extension.storage = storage;

		storage[n] = storage[n] instanceof Object ? 
			storage[n] : new Object();

		storage[n].copies instanceof Array ? 
			storage[n].copies : new Array();

		Extension.build.copies({copies:[].concat.apply(
			message.copies, storage[n].copies)}, n);

	});
});

	

