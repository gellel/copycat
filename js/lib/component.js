class Component extends HTMLElement {

	static Get (name) {

		return window.customElements.get(String(name));
	}

	static Defined (name) {

		return !document.createElement(String(name)) instanceof HTMLUnknownElement ? true : false;
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

		let constructor = a.slice(-1)[0];

		constructor = constructor.prototype instanceof HTMLElement ? constructor : class extends HTMLElement {};

		if (!Component.Get(name)) window.customElements.define(name, constructor);

		return document.createElement(name);
	}
}

