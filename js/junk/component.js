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

	get componentAppProperties () {
		return this.__base__.properties;
	}

	get componentAppStates () {
		return this.__base__.states;
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

	propegateProperties () {
		let s = this.componentAppSections;
		let p = this.componentAppProperties;

		for (let key in s) 
			if (s.hasOwnProperty(key) && p.hasOwnProperty(key))
				console.log(s[key])
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

	connectedCallback () {
		this.appendChild(this.componentAppBase);

		if (this.onConnect && this.onConnect instanceof Function)
			this.onConnect();
	}

	disconnectedCallback () {
		if (this.onDisconnect && this.onDisconnect instanceof Function)
			this.onDisconnect();
	}

	constructor () {
		super();

		Object.assign(this, {__base__:{
			properties:{}, states:{}}});

		if (this.onConstruct && this.onConstruct instanceof Function)
			this.onConstruct();

		this.addEventListener('change', function (e) {
			console.log(this, e)
		}, false);
	}
}





customElements.define('component-element', HTMLComponent);

var i = document.createElement('component-element');

document.body.appendChild(i);

clear();