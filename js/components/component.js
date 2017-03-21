/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class HTMLComponent extends HTMLStructure {

	get componentAppShadow () {
		return this.componentAppProperties.shadow;
	}

	get componentAppAnchor () {
		return this.componentAppShadow;
	}

	componentAppStructured () {
		return Object.keys(this.componentAppProperties).length && 
			this.componentAppShadow.insertNode instanceof Function;
	}

	connectedCallback () {
		if (this.onPrepare && this.onPrepare instanceof Function)
			this.onPrepare();

		for (let i = 0, c = this.children, l = c.length; i < l; i++)
			this.removeChild(c[i]);

		if (this.onConnect && this.onConnect instanceof Function)
			this.onConnect(this.componentAppAnchor);

		return this.propagateProperties();
	}

	constructor () {
		super ();

		this.addComponentAppProperties({ 
			shadow: this.attachShadow({ mode: 'open' }) });
	}
}