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
		let e = document.createElement('svg');

		return e;
	}

	get onConstructQueue () {
		return [this.propagateStructure];
	}
	
	constructor () {
		super();
	}
}
