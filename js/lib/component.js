class Component {

	static Name () {

		let a = Array.prototype.slice.call(arguments);

		a = a.filter(function (i) { return typeof i === 'string' ? i : !1 });

		a = a.map(function (i) { return i.replace(/[^a-zA-Z\-]/gi, '').split(/\-|(?=[A-Z])/g); });

		a = [].concat.apply([], a).filter(function (i) { return /\S/.test(i); })

		a = a.length && a.length > 1 ? a :  ['custom', 'element'];

		return (a).join('-').toLowerCase();
	}

	static Config (config) {

		config = config instanceof Object ? config : new Object();

		for (let i = 0, k = ['prototype', 'extends']; i < k.length; i++)
			if (!config.hasOwnProperty(k[i])) config[k[i]] = undefined;

		return config
	}
}