/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Close extends HTMLPictoglpyh {

	propagateStructure () {
		(function (self, b) {


			let e = document.createElementNS('http://www.w3.org/2000/svg', 'path');

			e.setAttributeNS(null, 'd', 'M188.6, 24.5l3.2-3.2c0.3-0.3, 0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1, 0l-3.2,3.2l-3.2-3.2c-0.3-0.3-0.8-0.3-1.1, 0 c-0.3, 0.3-0.3, 0.8, 0, 1.1l3.2, 3.2l-3.2, 3.2c-0.3,0.3-0.3,0.8, 0, 1.1c0.3, 0.3, 0.8, 0.3, 1.1, 0l3.2-3.2l3.2, 3.2c0.3, 0.3, 0.8, 0.3, 1.1, 0 c0.3-0.3, 0.3-0.8, 0-1.1L188.6, 24.5z');
			
			b.appendChild(e);

			b.setAttributeNS(null, 'viewBox', '182.5 19.5 10 10');


		})(this, this.componentAppAnchor);
	}

	constructor () {
		super();
	}
}

customElements.define('close-icon', Close);
