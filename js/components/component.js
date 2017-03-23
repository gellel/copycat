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

	get onConnectQueue () {
		return [this.propagateStructure];
	}

	get componentAppAnchor () {
		return this.shadowRoot;
	}

	constructor () {
		super ();

		this.addComponentAppProperties({ 
			shadow: this.attachShadow({ mode: 'open' }) });
	}
}