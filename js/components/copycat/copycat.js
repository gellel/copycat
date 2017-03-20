/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class CopyCat extends HTMLComponent {

	componentAppStructured () {
		return Object.keys(this.componentAppProperties).length && 
			this.componentAppAnchor.insertNode instanceof Function;
	}

	onPrepare () {
		if (!this.componentAppStructured())
			this.deconstructor();

		return this;
	}

	constructor () {
		super();
	}
}

customElements.define('copycat-element', CopyCat);