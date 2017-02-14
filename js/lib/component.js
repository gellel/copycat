class Component {

	static Name () {
		/**
		*** Formats custom HTML tag names.
		*
		* Accepts multiple string arguments.
		* Edits arguments to match string pattern for custom HTML.
		* Strings are separated by hyphens and uppercase characters.
		*
		**/

		/**
	    *** @param: arguments, @type: sequence.
	    *
	    *** @return: @type: string.
	    */

		let a = Array.prototype.slice.call(arguments);

		a = a.filter(function (i) { return typeof i === 'string' ? i : !1 });

		a = a.map(function (i) { return i.replace(/[^a-zA-Z\-]/gi, '').split(/\-|(?=[A-Z])/g); });

		a = [].concat.apply([], a).filter(function (i) { return /\S/.test(i); });

		a = a.length && a.length > 1 ? a :  ['custom', 'element'];

		return (a).join('-').toLowerCase();
	}

	static Config (config) {
		/**
		*** Forats custom HTML config objects.
		*
		* Accepts object argument.
		* Assigns primary prototype keys.
		* Key names are kept in object.
		*
		**/

		/**
	    *** @param: config, @type: object.
	    *
	    *** @return: @type: object.
	    */

		config = config instanceof Object ? config : new Object();

		for (let i = 0, k = ['prototype', 'extends']; i < k.length; i++)
			if (!config.hasOwnProperty(k[i])) 
				config[k[i]] = undefined;

		return config;
	}

	static Register () {
		/** 
		*** Sets custom HTML in browser config.
		*
		* Accepts multiple string and object arguments.
		* Strings are cast as parameters for Component.Name.
		* Objects are cast as parameters for Component.Config.
		*
		**/

		/**
	    *** @param: config, @type: object.
	    *
	    *** @return: @type: HTMLElement.prototype.
	    */

		let a = Array.prototype.slice.call(arguments);

		let o = new Object();

		let n = a.filter(function (i) { if (typeof i === 'string') return i; });

		let c = a.filter(function (i) { if (i instanceof Object) return i; });

		for (let i = 0; i < c.length; i++) Object.assign(o, c[i])

		let e = document.registerElement(Component.Name.apply(null, n), Component.Config(o));

		return new e();
	}
}