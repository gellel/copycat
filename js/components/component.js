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
		return [function (self) { console.log(self); self.propagateProperties() }];
	}

	get componentAppShadow () {
		return this.componentAppProperties.shadow;
	}

	get componentAppAnchor () {
		return this.componentAppShadow;
	}

	constructor () {
		super ();

		this.addComponentAppProperties({ 
			shadow: this.attachShadow({ mode: 'open' }) });
	}
}