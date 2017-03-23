/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class CopyCat extends HTMLConstruct {

	get componentAppPropertiesSet () {
		return [function () { if (!(Object.keys(this.componentAppProperties).length && 
			this.componentAppAnchor.insertNode instanceof Function)) this.deconstructor(); }];
	}

	constructor () {
		super();
	}
}

customElements.define('copycat-element', CopyCat);