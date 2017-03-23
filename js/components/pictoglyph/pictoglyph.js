/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class HTMLPictoglpyh extends HTMLComponent {

	get componentAppBase () {
		return this.shadowRoot.firstChild instanceof SVGSVGElement ?	
			this.shadowRoot.firstChild :
			this.shadowRoot.appendChild(document.createElement('svg'));
	}

	get onConstructQueue () {
		return [this.propagateStructure];
	}
	
	constructor () {
		super();
	}
}
