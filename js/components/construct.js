/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class HTMLConstruct extends HTMLStructure {
	
	get componentAppBase () {
		let e = document.createElement('div');
		e.setAttribute('data-component-base', '');
		e.setAttribute('data-constructor-name', this.constructor.name);
		e.setAttribute('data-constructor-prototype', Object.getPrototypeOf(this.constructor).name);

		return e;
	}

	get componentAppAnchor () {
		let e = this.querySelector('[data-component-base]');

		return e instanceof Element && this.firstChild === e ? e : this.componentAppBase;
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

	constructor () {
		super();

		(function (self) {
			new MutationObserver(function (observations) {
				observations.forEach(function (change) {
					if (change.type.includes('childList'))
						for (let i = 0, c = self.children, l = c.length; i < l; i++)
							if (!c[i].hasAttribute('data-component-base'))
								self.removeChild(c[i]);
				});
			}).observe(self, {childList:true});
		})(this);
	}
}
