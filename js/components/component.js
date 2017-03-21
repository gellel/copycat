/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class HTMLComponent extends HTMLElement {
	
	get componentAppBase () {
		let e = document.createElement('div');
		e.setAttribute('data-component-base', '');
		e.setAttribute('data-constructor-name', this.constructor.name);
		e.setAttribute('data-constructor-prototype', Object.getPrototypeOf(this.constructor).name);

		return e;
	}

	get componentAppSections () {
		for (var i = 0, o = {}, s = this.querySelectorAll('[data-component-section'), l = s.length; i < l; i++)
			if (s[i].hasAttribute('data-component-id'))
				Object.assign(o, {[s[i].getAttribute('data-component-id')]:s[i]});

		return o;
	}

	get componentAppAnchor () {
		let e = this.querySelector('[data-component-base]');

		return e instanceof Element && this.firstChild === e ? e : this.componentAppBase;
	}

	get componentAppProperties () {
		return this.__base__.properties;
	}

	get componentAppStates () {
		return this.__base__.states;
	}

	get componentAppConstants () {
		let c = this.__base__.constants;
		return c instanceof Object ? c : {};
	}

	get componentAppState () {
		for (let key in this.__base__.states)
			if (this.__base__.states.hasOwnProperty(key))
				if (this.__base__.states[key])
					return key;

		return null;
	}

	set componentAppState (state) {
		for (let key in this.__base__.states)
			if (this.__base__.states.hasOwnProperty(key))
				if (!(key === state)) 
					this.__base__.states[key] = false;

		if (typeof state === 'string') 
			this.__base__.states[state] = true;

		this.componentAppState ? 
			this.setAttribute('data-component-state', this.componentAppState) : 
			this.removeAttribute('data-component-state');

		return state;
	}

	assertState (state) {
		this.__base__.states[state] = true;

		return this;
	}

	propagateProperties () {
		let s = this.componentAppSections;
		let p = this.componentAppProperties;

		for (let key in s) 
			if (s.hasOwnProperty(key) && p.hasOwnProperty(key))

				(function (self, f, key, value) {
					
					if (self[f] instanceof Function) self[f](value);

				})((s[key].hasAttribute('data-component-bind') ? s[key] : this), 
				s[key].getAttribute('data-component-method'), key, p[key]);


		return this;
	}

	addComponentAppSection (parent, element, attributes) {
		if (this === parent) return;

		if (!parent instanceof Element || !this.contains(parent)) return;

		if (!attributes instanceof Object && !typeof attributes.id === 'string') return;

		if (this.querySelector('[data-component-id="' + attributes.id + '"]')) return;

		element = element instanceof Element ? element : 
			document.createElement((typeof element === 'string' ? element : 'div'));

		element.setAttribute('data-component-section', '');

			for (let key in attributes)

				element.setAttribute('data-component-' + key, attributes[key]);

		parent.appendChild(element);

		return this;
	}

	removeComponentAppSection (element) {
		if (element === this) return;

		element = element instanceof Element ? element : 
			this.querySelector('[data-component-id="' + element.toString() + '"]');

		if (!element || !this.contains(element)) return;

		if (element.hasAttribute('data-component-section'))
			for (let attribute in element.dataset)
				if (/^component[A-Za-z]+$/gi.test(attribute))
					delete element.dataset[attribute];

		return this;
	}

	addComponentAppState () {
		if (arguments.length)
			for (let i = 0, l = arguments.length; i < l; i++)
				this.__base__.states[arguments[i]] = false;

		return this;
	}

	removeComponentAppState () {
		if (arguments.length)
			for (let i = 0, l = arguments.length; i < l; i++)
				delete this.__base__.states[arguments[i]];

		return this;
	}
 
	addComponentAppProperties (properties) {
		if (properties instanceof Object && Object.keys(properties).length)
			for (let key in properties)
				if (properties.hasOwnProperty(key))
					this.__base__.properties[key] = properties[key];

		return this;
	}

	removeComponentAppProperties () {
		if (arguments.length)
			for (let i = 0, l = arguments.length; i < l; i++)
				delete this.__base__.properties[arguments[i]];

		return this;
	}

	addComponentAppConstants (constants) {
		if (!this.__base__.constants)

			if (constants instanceof Object && Object.keys(constants).length)

				Object.defineProperty(this.__base__, 'constants', {
					value: (function (k) {
					for (let key in constants) 
						Object.defineProperty(k, key, {
							value: constants[key], writable: false });

					return k;

				})({}), writable: false, enumerable: true });

		return this.__base__.constants;
	}

	deconstructor () {
		let parent = this.parentElement;

		if (parent instanceof Element && parent.contains(this))
			parent.removeChild(this);

		return parent;
	}

	connectedCallback () {
		if (this.onPrepare && this.onPrepare instanceof Function)
			this.onPrepare();

		for (let i = 0, c = this.children, l = c.length; i < l; i++)
			this.removeChild(c[i]);

		this.appendChild(this.componentAppBase);

		if (this.onConnect && this.onConnect instanceof Function)
			this.onConnect(this.firstChild);

		return this.propagateProperties();
	}

	disconnectedCallback () {
		let parent = this.parentElement;

		if (this.onDisconnect && this.onDisconnect instanceof Function)
			this.onDisconnect();

		return parent;
	}

	constructor () {
		super();

		let self = this;

		Object.assign(this, { 
			__base__: {
				properties: new Proxy({}, {
					set: function (obj, prop, value) {

						let assign = 'on' + prop.charAt(0).toUpperCase() + prop.slice(1) + 'Change';

						if (self[assign] && self[assign] instanceof Function)
							self[assign](value);

						if (self.onPropertiesChange && self.onPropertiesChange instanceof Function) 
							self.onPropertiesChange(prop, value, obj);
						
						return Object.assign(obj, {[prop]:value});
					}
				}), 
				states: new Proxy({}, {
					set: function (obj, state, value) {
						if (self.onStateChange && self.onStateChange instanceof Function)
							self.onStateChange(state, value, obj);

						return Object.assign(obj, {[state]:value});
					}	
				})
			}
		});

		if (this.onConstruct && this.onConstruct instanceof Function)
			this.onConstruct();

		new MutationObserver(function (observations) {
			observations.forEach(function (change) {
				if (change.type.includes('childList'))
					for (let i = 0, c = self.children, l = c.length; i < l; i++)
						if (!c[i].hasAttribute('data-component-base'))
							self.removeChild(c[i]);
			});
		}).observe(this, {childList:true});

	}
}
