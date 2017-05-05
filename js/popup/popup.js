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

	copies: function (copies, n) {

		if (!(copies instanceof Array && copies.length)) return;

		for (let i = 0, c = copies, l = c.length; i < l; i++) {

			c[i].id = (new Date().getTime());

			console.log(c[i].id)

			Extension.HTML.copies.appendChild(
				document.createElement('copycat-element').appendProperties({
					title: c[i].title, source: c[i].tab.host, text: c[i].text, href: c[i].tab.href }));
		}
		
		/* store keys. */
		Extension.manage.store(copies, n);
	}
};

Extension.manage = {

	store: function (copies, n) {
		if (copies instanceof Array && copies.length)
			Extension.browser.storage.sync.set({[n]: {copies: copies}});
	},

	remove: function (copies, id, n) {

		if (!(copies instanceof Array && copies.length && typeof id === 'number')) return;
		
		let key = undefined;

		for (let i = 0, c = copies, l = c.length; i < l && !(key); i++)
			if (c[i].id === id) key = i;
		
		if (typeof key === 'number') 
			console.log(copies[key], 'found!');
	},

	add: function (copies, object, n) {
		if (copies instanceof Array && copies.length)
			if (object instanceof Object && Object.keys(object).length)
				this.store(copies.append(object), n);
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

		/* set namespace reference. */
		let n = Extension.manifest.name;

		/* set object instance. */
		storage[n] = storage[n] instanceof Object ? 
			storage[n] : new Object();

		/* set array instance. */
		storage[n].copies instanceof Array ? 
			storage[n].copies : new Array();

		/* merge arrays. */
		storage[n].copies = [].concat.apply(
			message.copies.map(JSON.parse), storage[n].copies);

		/* construct content. */
		Extension.build.copies(storage[n].copies, n);

	});
});

	

