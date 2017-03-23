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

	get onPrepareQueue () {
		return [this.propagateBase];
	}

	get onConnectQueue () {
		return [this.propagateStructure];
	} 

	get onConstructQueue () {
		return [function () { new MutationObserver(function (observations) {
				observations.forEach(function (change) {
					if (change.type.includes('childList'))
						for (let i = 0, c = this.children, l = c.length; i < l; i++)
							if (!c[i].hasAttribute('data-component-base'))
								this.removeChild(c[i]);
				}.bind(this));
			}.bind(this)).observe(this, {childList:true});
		}];
	}
	
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

	propagateBase () {
		if (!this.querySelectorAll('[data-component-base]').length)
			this.appendChild(this.componentAppAnchor);

		return this;
	}

	constructor () {
		super();
	}
}
