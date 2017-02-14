class Component extends HTMLElement {

	static Get (name) {

		return window.customElements.get(String(name));
	}
	
	static Name () {

		let a = Array.prototype.slice.call(arguments);

		a = a.filter(function (i) { if (typeof i === 'string') return i; });

		a = a.map(function (i) { return i.replace(/[^a-zA-Z\-]/gi, '').split(/\-|(?=[A-Z])/g); });

		a = [].concat.apply([], a).filter(function (i) { return /\S/.test(i); });

		a = a.length && a.length > 1 ? a :  ['custom', 'element'];

		return (a).join('-').toLowerCase();
	}


	static Register () {

		let a = Array.prototype.slice.call(arguments);

		let name = Component.Name.apply(null, a.filter(function (i) { if (typeof i === 'string') return i; }));

		let config = a.reduce(function(result, current) {
			for (let key in current)
				if (current.hasOwnProperty(key)) 
					result[key] = current[key];
			
			return result;
		}, {});

		let constructor = a.slice(-1)[0];

		constructor = constructor.prototype instanceof HTMLElement ? constructor : class extends HTMLElement { constructor (config) { super(); for (let key in (config = config instanceof Object ? config : {})) this[key] = config[key]; }};

		if (!Component.Get(name)) window.customElements.define(name, constructor);

		return document.createElement(name);
	}
}