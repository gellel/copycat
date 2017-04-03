
class S extends HTMLElement {


	disconnectedCallback () {
		for (let i = 0, c = this.component.queues.disconnect, l = c.length; i < l; i++)
			c[i].bind(this)(this, i);
	}

	connectedCallback () {
		for (let i = 0, c = this.component.queues.prepare, l = c.length; i < l; i++)
			c[i].bind(this)(this, i);

		for (let i = 0, c = this.component.queues.connect, l = c.length; i < l; i++)
			c[i].bind(this)(this, i);
	}

	constructedCallback () {
		for (let i = 0, c = this.component.queues.construct, l = c.length; i < l; i++)
			c[i].bind(this)(this, i);
	}

	constructor () {
		Object.defineProperty(super(), 'component', {
			enumerable: false,
			writable: false,
			value: Object.defineProperties({}, {
				parent: {
					writable: false,
					enumerable: false,
					value: Object.getPrototypeOf(this.constructor).name
				},
				sectionreference: {
					writable: false,
					enumerable: false,
					value: 'data-component-section'
				},
				propertychange: {
					writable: false,
					enumerable: false,
					value: 'onProperty%sChange'
				},
				statechange: {
					writable: false,
					enumerable: false,
					value: 'onState%sChange'
				},
				sections: { 
					get: function () {
		
						let a = this.anchor;

						a = a && a.querySelectorAll ? 
							a.querySelectorAll('[' + this.sectionreference + ']') : [];

						let s = a.length ? Array.prototype.slice.call(a).filter(function (i) { 
							if (i.getAttribute instanceof Function) 
								if (i.getAttribute(this.sectionreference)) 
									return i; }.bind(this)) : a;

						for (var i = 0, l = s.length, o = {}; i < l; i++)
							Object.assign(o, {[s[i].getAttribute('data-component-section')]: s[i]});

						return o;
					}
				},
				structure: { 
					writable: false, 
					enumerable: false, 
					value: this 
				},
				base: { 
					writable: true, 
					enumerable: false, 
					value: this 
				},
				anchor: { 
					get: function () { 
						return this.base; 
					}, 
					set: function (e) { 
						this.base = (e = e instanceof Element && 
							(e === this.structure || this.structure.contains(e)) ? 
								e : this.shadowRoot ? this.shadowRoot : this.base); 
					}
				},
				states: { 
					writable: false, 
					enumerable: true, 
					value: new Proxy({}, {
						set: function (obj, prop, value) {

							let f = this.statechange.replace('%s', 
								(prop.charAt(0).toUpperCase() + prop.slice(1)));

							f = this.base[f];

							if (f instanceof Function) 
								f(value);
							
							return Object.assign(obj, {[prop]:value}); 
						} 
					}) 
				},
				properties: { 
					writable: false, 
					enumerable: true, 
					value: new Proxy({}, {
						set: function (obj, prop, value) {

							let f = this.propertychange.replace('%s', 
								(prop.charAt(0).toUpperCase() + prop.slice(1)));

							f = this.base[f];

							if (f instanceof Function) 
								f(value);
							
							return Object.assign(obj, {[prop]:value}); 
						} 
					}) 
				},
				queues: {
					writable: false,
					enumerable: false,
					value: Object.defineProperties({}, {
						construct: { 
							writable: false, 
							enumerable: false, 
							value: [].filter(
								function (i) { 
									if (i instanceof Function) 
										return i; 
								}) 
						},
						prepare: { 
							writable: false, 
							enumerable: false, 
							value: [].filter(
								function (i) { 
									if (i instanceof Function) 
										return i; 
								}) 
						},
						connect: { 
							writable: false, 
							enumerable: false, 
							value: [].filter(
								function (i) { 
									if (i instanceof Function) 
										return i; 
								}) 
						},
						disconnect: { 
							writable: false, 
							enumerable: false, 
							value: [].filter(
								function (i) { 
									if (i instanceof Function) 
										return i; 
								}) 
						}
					})
				},
				methods: {
					writable: false,
					enumerable: true,
					value: Object.defineProperties({}, {
						propagateProperties: {
							writable: false,
							enumerable: true,
							value: function () {

								let p = this.properties;
								let s = this.sections;

								for (let key in s)
									if (s.hasOwnProperty(key) && p.hasOwnProperty(key))
										if (s[key].hasAttribute('data-component-method'))
											(function (e, method) { 

												if (e[method] instanceof Function)
													e[method](p[key]);

											}.bind(this))(s[key].hasAttribute('data-component-bound') ? s[key] : this, 
											s[key].getAttribute('data-component-method'));

							}.bind(this)
						}
					})
				}
			})
		});
	}
}


customElements.define('custom-element', S);

var i = document.createElement('custom-element');

var z = document.createElement('div');

i.appendChild(z);

console.log(i.component)